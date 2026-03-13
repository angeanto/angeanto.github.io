document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("substack-feed");
  if (!container) return;

  const feedUrl =
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fantonisangelakis.substack.com%2Ffeed";

  function stripHtml(html = "") {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return (temp.textContent || temp.innerText || "").trim();
  }

  function extractImage(item) {
    if (item.thumbnail) return item.thumbnail;

    const content = item.content || "";
    const match = content.match(/<img[^>]+src="([^">]+)"/i);
    return match ? match[1] : "";
  }

  function formatDate(dateString) {
    try {
      return new Date(dateString).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    } catch {
      return "";
    }
  }

  function truncateText(text, maxLength) {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength).trim()}…`;
  }

  try {
    const response = await fetch(feedUrl);
    const data = await response.json();

    if (!data.items || !data.items.length) {
      container.innerHTML = "<p>No Substack posts available right now.</p>";
      return;
    }

    const items = data.items.slice(0, 6);

    container.innerHTML = items
      .map((item) => {
        const imageUrl = extractImage(item);
        const title = truncateText(item.title || "Untitled post", 68);
        const descriptionRaw = stripHtml(item.description || item.content || "");
        const description = truncateText(descriptionRaw, 95);
        const date = formatDate(item.pubDate);

        return `
          <article class="substack-mini-card">
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="substack-mini-card-link">
              <div class="substack-mini-card-media">
                ${
                  imageUrl
                    ? `<img src="${imageUrl}" alt="${title}" class="substack-mini-card-image">`
                    : `<div class="substack-mini-card-placeholder">DataConscious</div>`
                }
              </div>
              <div class="substack-mini-card-body">
                <p class="substack-mini-card-date">${date}</p>
                <h3 class="substack-mini-card-title">${title}</h3>
                <p class="substack-mini-card-excerpt">${description}</p>
                <span class="substack-mini-card-cta">Read on Substack →</span>
              </div>
            </a>
          </article>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Failed to load Substack feed:", error);
    container.innerHTML =
      "<p>Failed to load Substack posts. Please try again later.</p>";
  }
});