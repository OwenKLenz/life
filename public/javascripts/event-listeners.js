import { emitGridState } from "./socket_stuff.js";
const resetPickers = () => {
    [...document.getElementsByClassName("colorPicker")].forEach((picker) => {
        picker.className = "colorPicker";
    });
};
const cellClickHandler = (e, grid) => {
    const target = e.target;
    const { xCoord, yCoord } = target.dataset;
    if (target.className.includes("cell")) {
        const cellCoords = { x: Number(xCoord), y: Number(yCoord) };
        if (target.className.includes("alive")) {
            grid.killCells([cellCoords]);
        }
        else {
            grid.birthCells([cellCoords], true);
        }
    }
};
export const attachResetListener = (resetFunction) => {
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", () => {
        resetFunction();
        emitGridState([]);
    });
};
export const attachGridInteractionEvents = (gridObject) => {
    const gridDiv = document.getElementById("grid");
    gridDiv.addEventListener("click", (e) => {
        cellClickHandler(e, gridObject);
        const liveCells = gridObject.getLiveCellCoords();
        emitGridState(liveCells);
    });
};
export const attachColorSelect = (grid) => {
    [...document.getElementsByClassName("colorPicker")].forEach((picker) => {
        const color = picker.dataset.color;
        picker.style.backgroundColor = color;
        picker.addEventListener("click", () => {
            resetPickers();
            picker.className = "colorPicker selected";
            grid.selectedColor = color;
        });
    });
};
//# sourceMappingURL=event-listeners.js.map