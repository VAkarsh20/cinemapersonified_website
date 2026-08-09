import os
import sys
import json
from google.protobuf.json_format import MessageToDict

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
            "director": ", ".join(directors) if directors else ""
        }
        catalog.append(catalog_item)
        
        # Save full review detail file as [id].json
        detail_file_path = os.path.join(reviews_output_dir, f"{review_id}.json")
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
