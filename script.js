const episodeList = document.getElementById("episodeList");

if (episodeList) {
  episodeList.innerHTML = episodes
    .map((episode) => {
      const isAvailable = episode.status === "available";
      const coverHtml = episode.cover
        ? `<img src="${episode.cover}" alt="${episode.ep} ${episode.title}">`
        : `<div class="cover-placeholder">✨</div>`;

      const buttonHtml = isAvailable
        ? `<a href="${episode.url}" class="read-button">อ่านตอนนี้</a>`
        : `<span class="disabled-button">Coming Soon</span>`;

      return `
        <article class="book-card ${isAvailable ? "" : "muted"}">
          <div class="book-cover-image">
            <span class="book-ep">${episode.ep}</span>
            ${coverHtml}
          </div>

          <div class="book-info">
            <span class="book-status ${isAvailable ? "" : "soft"}">
              ${episode.statusText}
            </span>

            <p class="book-category">${episode.category}</p>

            <h3>${episode.title}</h3>

            <p>${episode.description}</p>

            ${buttonHtml}
          </div>
        </article>
      `;
    })
    .join("");
}