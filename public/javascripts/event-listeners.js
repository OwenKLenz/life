import { emitGridState } from "./socket_stuff.js";
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
    const colors = document.getElementsByClassName("colorPicker");
    // const blueDiv = document.getElementById("pickBlue");
    // const redDiv = document.getElementById("pickRed");
    // const greenDiv = document.getElementById("pickGreen");
    debugger;
    for (let i = 0; i < colors.length; i++) {
        const picker = colors[i];
        const color = picker.dataset.color;
        picker.style.backgroundColor = color;
        picker.addEventListener("click", () => {
            grid.selectedColor = color;
        });
    }
};
//# sourceMappingURL=event-listeners.js.map