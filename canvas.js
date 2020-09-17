function drawingStart(event) {
  isDrawingStart = true;
  initToolConfig();
  drawing(event);
}

function drawingEnd() {
  isDrawingStart = false;
  canvasCtx.beginPath();
}

function drawing(event) {
  if (!isDrawingStart) {
    return;
  }
  const { type: toolType, dimension: toolDimension = "default" } = selectedTool;
  if (toolType) {
    canvasCtx.lineWidth = toolList[toolType][toolDimension];
    canvasCtx.lineCap = "round";

    canvasCtx.lineTo(
      event.clientX - leftOffset,
      event.clientY - (topOffset - cursorEndOffset)
    );
    canvasCtx.stroke();

    canvasCtx.beginPath();
    canvasCtx.moveTo(
      event.clientX - leftOffset,
      event.clientY - (topOffset - cursorEndOffset)
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
    canvasCtx.globalCompositeOperation = "source-over";
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
canvas.addEventListener("mouseup", drawingEnd);
canvas.addEventListener("mousemove", drawing);
window.addEventListener("resize", resizeCancas);
