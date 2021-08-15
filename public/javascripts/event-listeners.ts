import { emitGridState } from "./socket_stuff.js";
import Grid from "./lib/grid";

const cellClickHandler = (e: Event, grid: Grid) => {
  const target = e.target as HTMLDivElement;

  const { xCoord, yCoord } = target.dataset;

  if (target.className.includes("cell")) {
    const cellCoords = {x: Number(xCoord), y: Number (yCoord)};

    if (target.className.includes("alive")) {
      grid.killCells([cellCoords] as Coord[]);
    } else {
      grid.birthCells([cellCoords] as Coord[], true);
    }
  }
}

export const attachResetListener = (resetFunction) => {
  const resetButton = document.getElementById("reset");

  resetButton.addEventListener("click", () => {
    resetFunction();
    emitGridState([]);
  })
}

export const attachGridInteractionEvents = (gridObject: Grid) => {
  const gridDiv = document.getElementById("grid") as HTMLDivElement;

  gridDiv.addEventListener("click", (e: Event) => {
    cellClickHandler(e, gridObject);

    const liveCells: Coord[] = gridObject.getLiveCellCoords();
    emitGridState(liveCells);
  })
}

export const attachColorSelect = (grid: Grid) => {
  const colors = document.getElementsByClassName("colorPicker");
  for (let i = 0; i < colors.length; i++) {
    const picker = colors[i] as HTMLElement;
    const color = picker.dataset.color;
    picker.style.backgroundColor = color;

    picker.addEventListener("click", () => {
      grid.selectedColor = color;
    })
  }
}
