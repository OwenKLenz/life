import { emitGridState } from "./socket_stuff.js";
const cellClickHandler = (e, grid) => {
    const target = e.target;
    const { xCoord, yCoord } = target.dataset;
    if (target.className.includes("cell")) {
        const cellCoords = [Number(xCoord), Number(yCoord)];
        if (target.className.includes("alive")) {
            grid.killCells([cellCoords]);
        }
        else {
            grid.birthCells([cellCoords]);
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
// const detachCellToggling = () => {
// const grid = document.getElementById("grid") as HTMLDivElement;
// grid.removeEventListener("click", cellClickHandler, true);
// }
//# sourceMappingURL=event-listeners.js.map