// ======================
// REFERENCIAS
// ======================
const deviceSelect = document.getElementById("deviceSelect");
const pcBtn = document.getElementById("pcBtn");

const game = document.getElementById("game");
const player = document.getElementById("player");
const door = document.getElementById("door");
const doorHint = document.getElementById("doorHint");
const hint = document.getElementById("hint");
const path = document.getElementById("path");

const final = document.getElementById("final");
const music = document.getElementById("music");

// ======================
// ESTADO
// ======================
let x = 0;
let y = 0;
const speed = 8;
let gameStarted = false;

// ======================
// INICIO SOLO PC
// ======================
pcBtn.addEventListener("click", () => {
  deviceSelect.style.display = "none";
  hint.innerText = "Usa W A S D para moverte — E para abrir";
  gameStarted = true;
  resetPlayer();
});

// ======================
// POSICIONES
// ======================
function resetPlayer() {
  const pathRect = path.getBoundingClientRect();

  x = pathRect.left + 20;
  y = pathRect.top + 20;

  placeDoor();
  updatePlayer();
}

function placeDoor() {
  const pathRect = path.getBoundingClientRect();

  door.style.left = pathRect.right - 70 + "px";
  door.style.top = pathRect.bottom - 110 + "px";
}

// ======================
// MOVIMIENTO
// ======================
function updatePlayer() {
  const pathRect = path.getBoundingClientRect();

  // Limitar al camino
  x = Math.max(pathRect.left, Math.min(pathRect.right - 30, x));
  y = Math.max(pathRect.top, Math.min(pathRect.bottom - 30, y));

  player.style.left = x + "px";
  player.style.top = y + "px";

  doorHint.style.opacity = checkDoor() ? "1" : "0";
}

// ======================
// COLISIÓN PUERTA
// ======================
function checkDoor() {
  const p = player.getBoundingClientRect();
  const d = door.getBoundingClientRect();

  return (
    p.right > d.left &&
    p.left < d.right &&
    p.bottom > d.top &&
    p.top < d.bottom
  );
}

// ======================
// ABRIR PUERTA
// ======================
function openDoor() {
  if (!checkDoor()) return;

  game.style.display = "none";
  final.classList.remove("hidden");
  music.play();
}

// ======================
// CONTROLES TECLADO
// ======================
document.addEventListener("keydown", (e) => {
  if (!gameStarted) return;

  switch (e.key.toLowerCase()) {
    case "w": y -= speed; break;
    case "s": y += speed; break;
    case "a": x -= speed; break;
    case "d": x += speed; break;
    case "e":
      openDoor();
      return;
    default:
      return;
  }

  updatePlayer();
});

// ======================
// AJUSTE AL REDIMENSIONAR
// ======================
window.addEventListener("resize", () => {
  if (gameStarted) {
    resetPlayer();
  }
});
