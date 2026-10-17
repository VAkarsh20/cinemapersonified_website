const GA_MEASUREMENT_ID = "G-0NTD5WH2ZS";

/**
 * Safely invoke window.gtag if Google Analytics is loaded.
 */
function safeGtag(...args) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

/**
 * Retrieve the entry source captured on landing (if any).
 */
export function getEntrySource() {
  try {
    return sessionStorage.getItem("cp_entry_source") || "direct_or_organic";
  } catch {
    return "direct_or_organic";
  }
}

/**
 * Clean ?ref= and ?utm_* parameters from the browser address bar after GA4 has
 * finished reading the initial landing URL, while keeping ?review=... and hashes intact.
 */
export function cleanAttributionParamsFromUrl() {
  if (typeof window === "undefined") return;

  // Store utm_source in sessionStorage if visitor arrived with standard UTM links
  try {
    const initialParams = new URLSearchParams(window.location.search);
    const utmSource = initialParams.get("utm_source");
    const utmMedium = initialParams.get("utm_medium");
    if (utmSource && !sessionStorage.getItem("cp_entry_source")) {
      sessionStorage.setItem("cp_entry_source", utmSource);
    }
    if (utmMedium && !sessionStorage.getItem("cp_entry_medium")) {
      sessionStorage.setItem("cp_entry_medium", utmMedium);
    }
  } catch {
    // Ignore storage errors in private browsing
  }

  // Wait 1.5s so async gtag.js finishes reading the initial URL parameters
  setTimeout(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const keysToRemove = [
        "ref",
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content"
      ];
      let modified = false;
      for (const key of keysToRemove) {
        if (params.has(key)) {
          params.delete(key);
          modified = true;
        }
      }
      if (modified) {
        const queryString = params.toString();
        const cleanUrl =
          window.location.pathname +
          (queryString ? `?${queryString}` : "") +
          window.location.hash;
        window.history.replaceState({}, "", cleanUrl);
      }
    } catch {
      // Ignore history API errors
    }
  }, 1500);
}

/**
 * Track virtual pageviews when switching SPA views (home, reviews, videos, publications, about).
 */
export function trackPageView(viewName, pageTitle) {
  if (typeof window === "undefined") return;
  const pagePath = viewName === "home" ? "/" : `/${viewName}`;
  safeGtag("event", "page_view", {
    send_to: GA_MEASUREMENT_ID,
    page_title: pageTitle || document.title,
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}${window.location.hash || ""}`,
    entry_source: getEntrySource()
  });
}

/**
 * Track when a visitor opens a specific movie review breakdown.
 */
export function trackReviewOpen(review) {
  if (!review) return;
  const pagePath = `/reviews/${review.id}`;
  const reviewTitle = `${review.title} (${review.release_year}) — Review`;

  safeGtag("event", "view_review", {
    review_id: String(review.id),
    movie_title: review.title,
    release_year: review.release_year,
    rating: review.rating,
    entry_source: getEntrySource()
  });

  safeGtag("event", "page_view", {
    send_to: GA_MEASUREMENT_ID,
    page_title: reviewTitle,
    page_path: pagePath,
    page_location: `${window.location.origin}/#/reviews/${review.id}`,
    entry_source: getEntrySource()
  });
}

/**
 * Track custom events (e.g. outbound clicks on video cards, article cards, or social buttons)
 * and open the target URL in a new tab.
 */
export function openTrackedLink(category, label, url, extraParams = {}) {
  safeGtag("event", `click_${category}`, {
    item_title: label,
    link_url: url,
    entry_source: getEntrySource(),
    ...extraParams
  });

  if (typeof window !== "undefined" && url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
