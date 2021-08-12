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
    const blueDiv = document.getElementById("pickBlue");
    const redDiv = document.getElementById("pickRed");
    const greenDiv = document.getElementById("pickGreen");
    blueDiv.addEventListener("click", () => {
        grid.selectedColor = "rgb(0, 0, 255)";
    });
    greenDiv.addEventListener("click", () => {
        grid.selectedColor = "rgb(0, 255, 0)";
    });
    redDiv.addEventListener("click", () => {
        grid.selectedColor = "rgb(255, 0, 0)";
    });
};
//# sourceMappingURL=event-listeners.js.map