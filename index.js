Element.prototype.addClass = function (className) {
  this.classList.add(className);
  return this;
};

Element.prototype.removeClass = function (className) {
  this.classList.remove(className);
  return this;
};

const toolList = {
  pencil: {
    thin: 1,
    medium: 3,
    bold: 5,
  },
  highlight: {
    default: 10,
  },
  eraser: {
    default: 10,
  },
};
const selectedTool = {};
const selectedColor = {
  pencil: "#666",
  highlight: "#fff3c3",
};

function selectTool({ type, dimension }) {
  toggleSelection({ type, dimension });
  selectedTool.type = type;
  selectedTool.dimension = dimension;
  selectColor(selectedColor[type]);
  document
    .getElementsByClassName("drawing-board")[0]
    .setAttribute("data-cursor", type);
}

function toggleSelection({ type, dimension }) {
  if (type === selectedTool.type && dimension === selectedTool.dimension)
    return;

  // reset active tool
  const oldSelectedToolType = document.querySelector(
    `[data-type='${selectedTool.type}']`
  );
  const oldSelectedToolDim = document.querySelector(
    `[data-dimension='${selectedTool.dimension}']`
  );
  if (oldSelectedToolType) {
    oldSelectedToolType.removeClass("active");
  }
  if (oldSelectedToolDim) {
    oldSelectedToolDim.removeClass("active");
  }

  // set  active tool
  const newSelectedToolType = document.querySelector(`[data-type='${type}']`);
  const newSelectedToolDim = document.querySelector(
    `[data-dimension='${dimension}']`
  );
  if (newSelectedToolType) {
    newSelectedToolType.addClass("active");
  }
  if (newSelectedToolDim) {
    newSelectedToolDim.addClass("active");
  }
}

function selectColor(color) {
  selectedTool.color = color;
  document.querySelector(`.color>i`).style.backgroundColor = color;
  selectedColor[selectedTool.type] = color;
}
