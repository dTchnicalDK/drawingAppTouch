const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const tools = document.querySelectorAll(".button.tool");
const filledShapeCheckBox = document.getElementById("filledShapes");

// unversal veriable to be used in various place
let color = "";
let brushWidth = 5;
let x1, y1, x2, y2;
let isPointerdown = false;
let activeTool = "brush";
let snapshot;

// onload function to calibrate brush and canvas
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

// fuction to activate a tool
tools.forEach((tool) => {
  tool.addEventListener("click", (e) => {
    document.querySelector(".button.tool.active").classList.remove("active");
    tool.classList.add("active");
    activeTool = tool.id;
    console.log(activeTool);
  });
});

const drawCircle = (e) => {
  console.log("wait i m drawing a circle");
};
const drawRectangle = (e) => {
  console.log("drawing rect");
  x2 = e.offsetX;
  y2 = e.offsetY;

  if (filledShapeCheckBox.checked) {
    ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
  } else {
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
  }
};

// function to set all neccsary attribute to begin drawing
const beginDrawing = (e) => {
  isPointerdown = true;
  x1 = e.offsetX;
  y1 = e.offsetY;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
};

// function to decide what shape is to be drawn on canvas
const drawing = (e) => {
  if (!isPointerdown) return;
  ctx.putImageData(snapshot, 0, 0);
  if (activeTool === "brush") {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (activeTool === "square") {
    drawRectangle(e);
  } else if (activeTool === "circle") {
    drawCircle(e);
  }
};

canvas.addEventListener("pointermove", drawing);
canvas.addEventListener("pointerdown", beginDrawing);
canvas.addEventListener("pointerup", () => {
  isPointerdown = false;
});
