const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const canvasHight = window.innerHeight - (window.innerHeight * 20) / 100;
const canvasWidth = window.innerWidth - (window.innerWidth * 10) / 100;
console.log(canvasWidth);
canvas.height = canvasHight;
canvas.width = canvasWidth;
let color = "";
let size = 2;
let x1, y1, x2, y2;
let isPointerdown = false;

//different mouse condition functions;
canvas.addEventListener("pointerdown", (e) => {
  isPointerdown = true;
  // e.preventDefault();
  x1 = e.offsetX;
  y1 = e.offsetY;
});
canvas.addEventListener("pointerup", () => {
  isPointerdown = false;
  x1 = undefined;
  y1 = undefined;
});
canvas.addEventListener("pointermove", (e) => {
  // e.preventDefault();
  if (isPointerdown) {
    x2 = e.offsetX;
    y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x1, y1, x2, y2);
    x1 = x2;
    y1 = y2;
  }
});
canvas.addEventListener("pointercancel", () => {
  console.log("pointerdown cancelled");
});
function drawCircle(x1, y1) {
  ctx.moveTo(x1, y1);
  ctx.beginPath();
  ctx.arc(x1, y1, size, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function selectColor(e) {
  color = e.target.value;
}

function increase() {
  let strokeSize = document.getElementById("strokeSize");
  size = size + 1;
  strokeSize.innerHTML = size;
}
function decrease() {
  let strokeSize = document.getElementById("strokeSize");
  size = size - 1;
  if (size < 1) {
    size = 1;
  }
  strokeSize.innerHTML = size;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
}
