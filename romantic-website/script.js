const CONFIG = {
  partnerName: "Sayangku Erlinda",
  senderName: "Parole",
  relationshipStart: "2025-07-20T00:00:00",
  letter: `Terima kasih sudah hadir dalam hidupku. Bersamamu, hal-hal sederhana terasa lebih indah dan hari-hari biasa punya cerita yang ingin selalu kuingat.\n\nAku mungkin tidak selalu pandai mengungkapkan semuanya, tetapi aku ingin kamu tahu bahwa kehadiranmu sangat berarti. Aku menyukai caramu tersenyum, caramu bercerita, dan caramu membuat dunia terasa sedikit lebih hangat.\n\nSemoga halaman kecil ini bisa mengingatkanmu bahwa kamu dicintai, dihargai, dan selalu punya tempat istimewa di hatiku.\n\nMaaf ya, kalau selama kita bersama aku masih sering bikin kamu kesal, kecewa, atau bahkan sedih karena sikap dan perkataanku. Aku tahu mungkin ada momen di mana aku kurang peka, terlalu egois, atau belum bisa menjadi pasangan yang kamu harapkan.

Terima kasih karena kamu tetap memilih bertahan dan terus mencoba mengerti aku. Aku benar-benar ngehargai itu.

Aku tidak bisa berjanji akan langsung menjadi orang yang sempurna, tapi aku berjanji akan terus belajar menjadi pasangan yang lebih baik lagi, sedikit demi sedikit, setiap hari.

Aku sayang kamu, lebih dari yang mungkin sering berhasil aku tunjukkin. ❤️`
};

const partnerName = document.getElementById("partnerName");
const senderName = document.getElementById("senderName");
const typedLetter = document.getElementById("typedLetter");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

partnerName.textContent = CONFIG.partnerName;
senderName.textContent = CONFIG.senderName;

let letterStarted = false;
function typeLetter() {
  if (letterStarted) return;
  letterStarted = true;
  let index = 0;
  const text = CONFIG.letter;

  const timer = setInterval(() => {
    typedLetter.textContent += text[index] === "\n" ? "\n" : text[index];
    typedLetter.style.whiteSpace = "pre-line";
    index++;
    if (index >= text.length) clearInterval(timer);
  }, 20);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      if (entry.target.closest("#letter")) typeLetter();
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

document.getElementById("openBtn").addEventListener("click", () => {
  document.getElementById("letter").scrollIntoView({ behavior: "smooth" });
  createHearts(18);
});

musicBtn.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicBtn.textContent = "Jeda Musik ❚❚";
    } else {
      music.pause();
      musicBtn.textContent = "Putar Musik ♪";
    }
  } catch {
    alert("Tambahkan file musik bernama music.mp3 ke folder assets terlebih dahulu.");
  }
});

function updateCounter() {
  const start = new Date(CONFIG.relationshipStart).getTime();
  const now = Date.now();
  const distance = Math.max(0, now - start);

  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateCounter();
setInterval(updateCounter, 1000);

const modal = document.getElementById("surpriseModal");
const surpriseBtn = document.getElementById("surpriseBtn");
const closeModal = document.getElementById("closeModal");

function showModal() {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  launchConfetti(120);
}

function hideModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

surpriseBtn.addEventListener("click", showModal);
closeModal.addEventListener("click", hideModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) hideModal();
});

document.getElementById("confettiBtn").addEventListener("click", () => {
  launchConfetti(180);
  createHearts(30);
});

function launchConfetti(amount = 100) {
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = `hsl(${Math.random() * 360}, 90%, 65%)`;
    piece.style.animationDuration = `${2.5 + Math.random() * 3}s`;
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 6500);
  }
}

function createHearts(amount = 8) {
  const container = document.getElementById("hearts");
  const icons = ["♥", "💗", "💖", "💕"];
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 24}px`;
    heart.style.animationDuration = `${4 + Math.random() * 5}s`;
    heart.style.animationDelay = `${Math.random() * 1.2}s`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
  }
}

setInterval(() => createHearts(1), 1400);

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: Math.min(180, Math.floor(window.innerWidth / 7)) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    a: Math.random(),
    speed: 0.002 + Math.random() * 0.008
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    star.a += star.speed;
    const opacity = 0.25 + Math.abs(Math.sin(star.a)) * 0.75;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${opacity})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawStars();
