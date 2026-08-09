import os
import sys
import json
import re
import unicodedata
import urllib.request
import urllib.error
import time
from google.protobuf.json_format import MessageToDict

def slugify(text):
    # Normalize accents
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = text.strip()
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text

def check_url_exists(url):
    req = urllib.request.Request(
        url,
        headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'}
    )
    try:
        # Pinging Letterboxd to see if the page exists
        with urllib.request.urlopen(req, timeout=5) as response:
            return response.status == 200
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return False
        # If it's a rate limit (429) or other block, return False to try fallback year slug
        return False
    except Exception:
        return False

# Define absolute directories
WEBSITE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
REVIEW_TOOL_DIR = os.path.abspath(os.path.join(WEBSITE_DIR, "..", "movie_review_tool"))

print(f"Website directory: {WEBSITE_DIR}")
print(f"Review tool directory: {REVIEW_TOOL_DIR}")

# Add review tool to python path so we can import its modules
sys.path.append(REVIEW_TOOL_DIR)

# Change working directory to REVIEW_TOOL_DIR so read_proto relative paths resolve correctly
os.chdir(REVIEW_TOOL_DIR)

from utils.proto_utils import read_proto

proto_dir = "movies_textproto"
if not os.path.exists(proto_dir):
    print(f"Error: {proto_dir} does not exist in {REVIEW_TOOL_DIR}")
    sys.exit(1)

files = [f for f in os.listdir(proto_dir) if f.endswith(".textproto")]
print(f"Found {len(files)} .textproto files to compile.")



catalog = []
failed_files = []

# Ensure output directory for individual review JSONs exists in website repo
reviews_output_dir = os.path.join(WEBSITE_DIR, "public", "reviews")
os.makedirs(reviews_output_dir, exist_ok=True)

# Loop and compile each file
for idx, filename in enumerate(files):
    name_without_ext = filename.replace(".textproto", "")
    try:
        # read_proto returns either Movie or MovieFree proto messages
        proto = read_proto(name_without_ext)
        # Convert to dictionary preserving exact protobuf snake_case field names
        data = MessageToDict(proto, preserving_proto_field_name=True)
        
        # Extract ID and default if missing
        review_id = data.get("id")
        if review_id is None:
            print(f"Warning: File {filename} does not contain an id field. Skipping.")
            continue
            
        title = data.get("title", "Unknown Title")
        release_year = data.get("release_year", 0)
        rating = data.get("rating", 0.0)
        review_date = data.get("review_date", "")
        imdb_id = data.get("imdb_id", "")
        redux = data.get("redux", False)
        
        # Extract director names if available
        directors = []
        review_data = data.get("review")
        if isinstance(review_data, dict):
            direction = review_data.get("direction")
            if direction and "director" in direction:
                directors = [d.get("name") for d in direction["director"] if d.get("name")]

        # Resolve Letterboxd slug
        letterboxd_slug = None
        detail_file_path = os.path.join(reviews_output_dir, f"{review_id}.json")
        
        # 1. Check if the compiled review JSON already exists and has the slug
        if os.path.exists(detail_file_path):
            try:
                with open(detail_file_path, "r", encoding="utf-8") as f:
                    old_data = json.load(f)
                    if "letterboxd_slug" in old_data and old_data["letterboxd_slug"]:
                        letterboxd_slug = old_data["letterboxd_slug"]
            except Exception:
                pass

        # 2. If not found in cache, run Automated URL Verification
        if not letterboxd_slug:
            base_slug = slugify(title)
            # Try base user review URL
            url_base = f"https://letterboxd.com/akarshv/film/{base_slug}/"
            print(f"Pinging Letterboxd for ID {review_id} ({title}): {url_base}")
            if check_url_exists(url_base):
                letterboxd_slug = base_slug
            else:
                # Try with year suffix
                year_slug = f"{base_slug}-{release_year}"
                url_year = f"https://letterboxd.com/akarshv/film/{year_slug}/"
                print(f"Base slug 404'd. Trying year slug: {url_year}")
                if check_url_exists(url_year):
                    letterboxd_slug = year_slug
                else:
                    # Try with year suffix + "-1"
                    year_dash_one_slug = f"{base_slug}-{release_year}-1"
                    url_year_dash_one = f"https://letterboxd.com/akarshv/film/{year_dash_one_slug}/"
                    print(f"Year slug 404'd. Trying year-1 slug: {url_year_dash_one}")
                    if check_url_exists(url_year_dash_one):
                        letterboxd_slug = year_dash_one_slug
                    else:
                        print(f"Warning: All slugs failed for ID {review_id} ({title}). Defaulting to standard slug.")
                        letterboxd_slug = base_slug
            
            # Sleep slightly to prevent rate limits
            time.sleep(0.15)
            
        data["letterboxd_slug"] = letterboxd_slug

        # Build catalog item
        catalog_item = {
            "id": review_id,
            "title": title,
            "release_year": release_year,
            "rating": rating,
            "review_date": review_date,
            "imdb_id": imdb_id,
            "redux": redux,
            "filename": name_without_ext,
            "director": ", ".join(directors) if directors else "",
            "letterboxd_slug": letterboxd_slug
        }
        catalog.append(catalog_item)
        
        # Save full review detail file as [id].json
        with open(detail_file_path, "w", encoding="utf-8") as out_f:
            json.dump(data, out_f, indent=2, ensure_ascii=False)
            
    except Exception as e:
        failed_files.append((filename, str(e)))

# Sort catalog by ID descending (newest reviews first)
catalog.sort(key=lambda x: x["id"], reverse=True)

# Save the catalog index in src/data/
catalog_output_path = os.path.join(WEBSITE_DIR, "src", "data", "reviews_catalog.json")
os.makedirs(os.path.dirname(catalog_output_path), exist_ok=True)
with open(catalog_output_path, "w", encoding="utf-8") as cat_f:
    json.dump(catalog, cat_f, indent=2, ensure_ascii=False)

print("\n--- Compilation Summary ---")
print(f"Successfully compiled: {len(catalog)} reviews.")
print(f"Failed files count: {len(failed_files)}")

if failed_files:
    print("\nFailed files list:")
    for fn, err in failed_files:
        print(f"  - {fn}: {err}")
else:
    print("All files compiled successfully without errors!")
