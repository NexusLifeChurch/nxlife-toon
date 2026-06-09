// ================================
// NxLife'Toon Script
// สร้างข้อมูลหน้า Home จาก episodes-data.js
// ================================


// ---------- Featured Books ----------
const featuredBooks = document.getElementById("featuredBooks");

if (featuredBooks) {
  const featuredEpisodes = episodes
    .filter((episode) => episode.featured === true && episode.status === "available")
    .sort((a, b) => a.sortOrder - b.sortOrder);

  featuredBooks.innerHTML = featuredEpisodes
    .map((episode) => {
      return `
        <a href="${episode.url}" class="featured-book-card">
          <div class="featured-cover">
            <img src="${episode.cover}" alt="${episode.ep} ${episode.title}">
          </div>

          <div class="featured-info">
            <span class="book-status">${episode.statusText}</span>
            <p class="book-room">${getRoomTitle(episode.roomId)}</p>

            <h3>${episode.ep}: ${episode.title}</h3>

            <p>${episode.description}</p>

            <span class="read-now">
              เปิดอ่านตอนนี้ →
            </span>
          </div>
        </a>
      `;
    })
    .join("");
}


// ---------- Room Grid ----------
const roomGrid = document.getElementById("roomGrid");

if (roomGrid) {
  const sortedRooms = rooms
    .filter((room) => room.status !== "hidden")
    .sort((a, b) => a.sortOrder - b.sortOrder);

  roomGrid.innerHTML = sortedRooms
    .map((room) => {
      const isAvailable = room.status === "available";

      return `
        <article class="room-card ${isAvailable ? "available" : "coming-soon"}">
          <div class="room-emoji">${room.emoji}</div>

          <div class="room-info">
            <h3>${room.title}</h3>
            <p>${room.subtitle}</p>

            ${
              isAvailable
                ? `<button class="room-button" onclick="alert('เฟสถัดไป: จะพาเข้าห้อง ${room.title}')">เข้าห้องนี้</button>`
                : `<span class="room-disabled">เร็ว ๆ นี้</span>`
            }
          </div>
        </article>
      `;
    })
    .join("");
}


// ---------- Helpers ----------
function getRoomTitle(roomId) {
  const room = rooms.find((item) => item.id === roomId);
  return room ? room.title : "";
}