const rooms = [
  {
    id: "must-know",
    title: "เรื่องต้องรู้",
    emoji: "📚",
    subtitle: "เรื่องพื้นฐานที่ช่วยให้รู้จักบ้าน NxLife",
    status: "available",
    sortOrder: 1
  },
  {
    id: "faith-life",
    title: "ชีวิต & ความเชื่อ",
    emoji: "💛",
    subtitle: "เรื่องราวการเติบโต ความหวัง และชีวิตกับพระเจ้า",
    status: "coming-soon",
    sortOrder: 2
  },
  {
    id: "community-care",
    title: "ชุมชนและการดูแล",
    emoji: "🏡",
    subtitle: "เรื่องความสัมพันธ์ การดูแล และการเดินไปด้วยกัน",
    status: "coming-soon",
    sortOrder: 3
  },
  {
    id: "growth-events",
    title: "กิจกรรมและการเติบโต",
    emoji: "🌱",
    subtitle: "ค่าย กิจกรรม การอบรม และเส้นทางการเติบโต",
    status: "coming-soon",
    sortOrder: 4
  },
  {
    id: "funny-home",
    title: "เรื่องฮา ๆ ในบ้านเรา",
    emoji: "😄",
    subtitle: "เรื่องขำ ๆ อบอุ่น ๆ จากชีวิตในบ้าน NxLife",
    status: "coming-soon",
    sortOrder: 5
  }
];

const shelves = [
  {
    id: "know-nxlife",
    roomId: "must-know",
    title: "รู้จัก NxLife",
    emoji: "🌱",
    subtitle: "เริ่มต้นเข้าใจว่า NxLife คืออะไร",
    status: "available",
    sortOrder: 1
  },
  {
    id: "around-nxlife",
    roomId: "must-know",
    title: "รอบรั้ว NxLife",
    emoji: "🏠",
    subtitle: "เรื่องราว บริบท และชีวิตในบ้าน NxLife",
    status: "coming-soon",
    sortOrder: 2
  },
  {
    id: "rights-duty",
    roomId: "must-know",
    title: "สิทธิหน้าที่กับ NxLife",
    emoji: "🤝",
    subtitle: "เข้าใจบทบาท การอยู่ร่วมกัน และความรับผิดชอบ",
    status: "coming-soon",
    sortOrder: 3
  },
  {
    id: "core-values",
    roomId: "must-know",
    title: "ค่านิยมหลัก NxLife",
    emoji: "✨",
    subtitle: "หัวใจ แนวคิด และวัฒนธรรมของชุมชน",
    status: "coming-soon",
    sortOrder: 4
  },
  {
    id: "house-rules",
    roomId: "must-know",
    title: "กฎกติกามารยาท",
    emoji: "📌",
    subtitle: "แนวทางที่ช่วยให้บ้านนี้อบอุ่นและปลอดภัย",
    status: "coming-soon",
    sortOrder: 5
  }
];

const episodes = [
  {
    id: "ep01",
    ep: "EP01",
    title: "NxLife คืออะไรกันแน่?",
    roomId: "must-know",
    shelfId: "know-nxlife",
    description: "ชวนรู้จัก NxLife แบบง่าย ๆ ผ่านยัยจอย เฮียปุ่ม และพี่แจ็ค",
    cover: "assets/covers/ep01-cover.jpg",
    imageFolder: "episodes/ep01/images/",
    totalImages: 17,
    status: "available",
    statusText: "พร้อมอ่าน",
    featured: true,
    sortOrder: 1
  }
];