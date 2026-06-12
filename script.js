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
        <a href="reader.html?ep=${episode.id}" class="featured-book-card">
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

<div class="story-meta">
  <span>📖 สนุกได้สาระ</span>
  <span>👥 ยัยจอย · ลุงปุ่ม · พี่แจ็ค</span>
</div>

<div class="coffee-note">
  <strong>☕ เรื่องราวแนะนำ วันนี้!!</strong>
  <p>เรื่องราวน่าสนใจที่อยากชวนหยิบขึ้นมาอ่าน</p>
</div>


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
                ? `<button class="room-button" onclick="openRoom('${room.id}')">เปิดตู้นี้</button>`
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

// ---------- Open Room / Show Shelves ----------
function openRoom(roomId) {
  const room = rooms.find((item) => item.id === roomId);

  if (!room) return;

  const roomsSection = document.getElementById("rooms");
  const shelvesView = document.getElementById("shelvesView");
  const storiesView = document.getElementById("storiesView");
  const shelfBreadcrumb = document.getElementById("shelfBreadcrumb");
  const selectedRoomTitle = document.getElementById("selectedRoomTitle");
  const shelfGrid = document.getElementById("shelfGrid");

  document.body.classList.remove("story-mode");

shelfBreadcrumb.textContent = `📙 ชั้นวาง:`;
selectedRoomTitle.textContent = "";
selectedRoomTitle.style.display = "none";

  const roomShelves = shelves
    .filter((shelf) => shelf.roomId === roomId)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  shelfGrid.innerHTML = roomShelves
    .map((shelf) => {
      const isAvailable = shelf.status === "available";

      return `
        <article class="shelf-card ${isAvailable ? "available" : "coming-soon"}">
          <div class="shelf-emoji">${shelf.emoji}</div>

          <div class="shelf-info">
            <h3>${shelf.title}</h3>
            <p>${shelf.subtitle}</p>

            ${
              isAvailable
                ? `<button class="shelf-button" onclick="openShelf('${shelf.id}')">เปิดชั้นวาง</button>`
                : `<span class="shelf-disabled">เร็ว ๆ นี้</span>`
            }
          </div>
        </article>
      `;
    })
    .join("");

  if (storiesView) {
    storiesView.classList.add("hidden");
    storiesView.classList.add("screen-hidden");
  }

  shelvesView.classList.remove("hidden");
  shelvesView.classList.remove("screen-hidden");

  shelvesView.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


// ---------- Back To Rooms ----------
function backToRooms() {
  const roomsSection = document.getElementById("rooms");
  const shelvesView = document.getElementById("shelvesView");
  const storiesView = document.getElementById("storiesView");

  shelvesView.classList.add("hidden");

  if (storiesView) {
    storiesView.classList.add("hidden");
  }

  roomsSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// ---------- Open Shelf / Show Stories ----------
function openShelf(shelfId) {
  const shelf = shelves.find((item) => item.id === shelfId);

  if (!shelf) return;

  const room = rooms.find((item) => item.id === shelf.roomId);

  const storiesView = document.getElementById("storiesView");
  const storyBreadcrumb = document.getElementById("storyBreadcrumb");
  const selectedShelfTitle = document.getElementById("selectedShelfTitle");
  const storyGrid = document.getElementById("storyGrid");

  storyBreadcrumb.textContent = `📚ตู้หนังสือ: ${room ? room.title : ""} › 📙ชั้นวาง: ${shelf.title}`;
  selectedShelfTitle.textContent = shelf.title;

  const shelfStories = episodes
  .filter((episode) => episode.shelfId === shelfId && episode.status !== "hidden")
  .sort((a, b) => a.sortOrder - b.sortOrder);

  if (shelfStories.length === 0) {
    storyGrid.innerHTML = `
      <div class="empty-story">
        <div class="empty-emoji">📭</div>
        <h3>ยังไม่มีเรื่องราวในชั้นวางนี้</h3>
        <p>ทีมงานกำลังค่อย ๆ เติมเรื่องราวใหม่ ๆ เข้ามาในบ้านนี้</p>
      </div>
    `;
  } else {
    storyGrid.innerHTML = shelfStories
      
    .map((episode) => {
      const isAvailable = episode.status === "available";

      return `
        ${
          isAvailable
            ? `<a href="reader.html?ep=${episode.id}" class="story-card">`
            : `<article class="story-card coming-soon">`
        }

          <div class="story-cover">
            <img src="${episode.cover}" alt="${episode.ep} ${episode.title}">
          </div>

          <div class="story-info">
            <span class="book-status">${episode.statusText}</span>
            <p class="story-room">${getRoomTitle(episode.roomId)}</p>

            <h3>${episode.ep}: ${episode.title}</h3>

            <p>${episode.description}</p>

            <div class="story-meta">
              <span>📖 สนุก สาระ</span>
              <span>👥 จอย · เฮียปุ่ม · พี่แจ็ค</span>
            </div>

            ${
              isAvailable
                ? `<span class="read-now">เปิดอ่านเรื่องนี้ →</span>`
                : `<span class="read-now disabled">ยังไม่เปิดให้อ่าน</span>`
            }
          </div>

        ${isAvailable ? `</a>` : `</article>`}
      `;
    })


      .join("");
  }

enterStoryScreen(shelfId);
}


// ---------- Back To Shelves ----------
function backToShelves() {
  const homeHouse = document.querySelector(".home-house");
  const featuredSection = document.querySelector(".featured-section");
  const roomsSection = document.querySelector(".rooms-section");
  const shelvesView = document.getElementById("shelvesView");
  const storiesView = document.getElementById("storiesView");

  // ออกจากโหมดหน้าเรื่องราว
  document.body.classList.remove("story-mode");

  // เปิดหน้าเดิมกลับมา
  if (homeHouse) {
    homeHouse.classList.remove("screen-hidden");
  }

  if (featuredSection) {
    featuredSection.classList.remove("screen-hidden");
  }

  if (roomsSection) {
    roomsSection.classList.remove("screen-hidden");
  }

  // ซ่อนหน้าเรื่องราว
  if (storiesView) {
    storiesView.classList.add("hidden");
    storiesView.classList.add("screen-hidden");
  }

  // แสดงชั้นวาง
  if (shelvesView) {
    shelvesView.classList.remove("hidden");
    shelvesView.classList.remove("screen-hidden");

    shelvesView.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  window.location.hash = "shelves";
}


// ---------- Open page by URL hash ----------
// ตัวอย่าง: index.html#shelf=know-nxlife
window.addEventListener("load", () => {
  const hash = window.location.hash;

  if (!hash) return;

  if (hash.startsWith("#shelf=")) {
    const shelfId = hash.replace("#shelf=", "");

    const shelf = shelves.find((item) => item.id === shelfId);

    if (!shelf) return;

    openRoom(shelf.roomId);

    setTimeout(() => {
      openShelf(shelfId);
    }, 250);
  }
});

function goToBookshelf() {
  document.body.classList.remove("story-mode");

  const homeHouse = document.querySelector(".home-house");
  const featuredSection = document.querySelector(".featured-section");
  const roomsSection = document.querySelector(".rooms-section");
  const shelvesSection = document.querySelector(".shelves-section");
  const storiesView = document.querySelector("#storiesView");

  if (homeHouse) homeHouse.classList.remove("screen-hidden");
  if (featuredSection) featuredSection.classList.remove("screen-hidden");
  if (roomsSection) roomsSection.classList.remove("screen-hidden");

  if (shelvesSection) {
    shelvesSection.classList.add("hidden");
    shelvesSection.classList.add("screen-hidden");
  }

  if (storiesView) {
    storiesView.classList.add("hidden");
    storiesView.classList.add("screen-hidden");
  }

  window.location.hash = "rooms";

  if (roomsSection) {
    roomsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function goHome() {
  document.body.classList.remove("story-mode");

  const homeHouse = document.querySelector(".home-house");
  const featuredSection = document.querySelector(".featured-section");
  const roomsSection = document.querySelector(".rooms-section");
  const shelvesSection = document.querySelector(".shelves-section");
  const storiesView = document.querySelector("#storiesView");

  if (homeHouse) homeHouse.classList.remove("screen-hidden");
  if (featuredSection) featuredSection.classList.remove("screen-hidden");
  if (roomsSection) roomsSection.classList.remove("screen-hidden");

  if (shelvesSection) {
    shelvesSection.classList.add("hidden");
    shelvesSection.classList.add("screen-hidden");
  }

  if (storiesView) {
    storiesView.classList.add("hidden");
    storiesView.classList.add("screen-hidden");
  }

  window.location.hash = "";
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function enterStoryScreen(shelfId) {
  const homeHouse = document.querySelector(".home-house");
  const featuredSection = document.querySelector(".featured-section");
  const roomsSection = document.querySelector(".rooms-section");
  const shelvesSection = document.querySelector(".shelves-section");
  const storiesView = document.querySelector("#storiesView");

  document.body.classList.add("story-mode");

  if (homeHouse) homeHouse.classList.add("screen-hidden");
  if (featuredSection) featuredSection.classList.add("screen-hidden");
  if (roomsSection) roomsSection.classList.add("screen-hidden");
  if (shelvesSection) shelvesSection.classList.add("screen-hidden");

  if (storiesView) {
    storiesView.classList.remove("hidden");
    storiesView.classList.remove("screen-hidden");
  }

  window.location.hash = `stories=${shelfId}`;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}