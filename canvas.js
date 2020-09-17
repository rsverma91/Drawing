function drawingStart(event) {
  canvas.addEventListener("mouseup", drawingEnd);
  canvas.addEventListener("mousemove", drawing);
  canvas.addEventListener("touchend", drawingEnd);
  canvas.addEventListener("touchmove", drawing);
  isDrawingStart = true;
  initToolConfig();
  drawing(event);
}

function drawingEnd() {
  isDrawingStart = false;
  canvasCtx.beginPath();
  canvas.removeEventListener("mouseup", drawingEnd);
  canvas.removeEventListener("mousemove", drawing);
  canvas.removeEventListener("touchend", drawingEnd);
  canvas.removeEventListener("touchmove", drawing);
}

function drawing(event) {
  console.log(event.clientX, event.clientY);
  if (!isDrawingStart) {
    return;
  }
  const { type: toolType, dimension: toolDimension = "default" } = selectedTool;
  if (toolType) {
    canvasCtx.lineWidth = toolList[toolType][toolDimension];
    canvasCtx.lineCap = "round";
    const clientX = event.clientX ? event.clientX : event.touches[0].clientX;
    const clientY = event.clientY ? event.clientY : event.touches[0].clientY;
    canvasCtx.lineTo(
      clientX - leftOffset,
      clientY - (topOffset - cursorEndOffset)
    );
    canvasCtx.stroke();

    canvasCtx.beginPath();
    canvasCtx.moveTo(
      clientX - leftOffset,
      clientY - (topOffset - cursorEndOffset)
    );
  }
}

function initToolConfig() {
  const { type: toolType } = selectedTool;
  if (toolType === "pencil") {
    canvasCtx.globalCompositeOperation = "source-over";
    canvasCtx.strokeStyle = selectedColor.pencil;
  } else if (toolType === "highlight") {
    canvasCtx.globalCompositeOperation = "destination-over";
    canvasCtx.strokeStyle = selectedColor.highlight;
  } else if (toolType === "eraser") {
    canvasCtx.globalCompositeOperation = "destination-out";
    canvasCtx.strokeStyle = "#FFF";
  }
}

function resizeCancas() {
  let tempContext = canvasCtx.getImageData(0, 0, canvas.width, canvas.height);
  canvas.height = document.getElementsByClassName(
    "drawing-board"
  )[0].clientHeight;
  canvas.width =
    document.getElementsByClassName("drawing-board")[0].clientWidth -
    leftOffset;
  canvasCtx.putImageData(tempContext, 0, 0);
}

const canvas = document.getElementById("canvas");
const canvasCtx = canvas.getContext("2d");

let isDrawingStart = false;
const leftOffset = 45;
const topOffset = 65;
const cursorEndOffset = 40;

// set Canvas size
resizeCancas();

canvas.addEventListener("mousedown", drawingStart);
canvas.addEventListener("touchstart", drawingStart);
window.addEventListener("resize", resizeCancas);
