import { emitGridState } from "./socket_stuff.js";
import Grid from "./lib/grid";

const resetPickers = (): void => {
  [...document.getElementsByClassName("colorPicker")].forEach((picker: HTMLElement) => {
    picker.className = "colorPicker";
  })
}

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

export const attachResetListener = (resetFunction: Function) => {
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
  [...document.getElementsByClassName("colorPicker")].forEach((picker: HTMLElement) => {
    const color = picker.dataset.color;
    picker.style.backgroundColor = color;

    picker.addEventListener("click", () => {
      resetPickers();
      picker.className = "colorPicker selected";
      grid.selectedColor = color;
    })
  })
}

export const cellHoverHighlighting = (grid: Grid) => {
  grid.gridDiv.addEventListener("mouseover", (event) => {
    if (grid.highlightedCell) {
      grid.highlightedCell.id = "";
    }

    const target = event.target as HTMLDivElement;

    if (target.className.includes("cell")) {
      grid.highlightedCell = event.target as HTMLDivElement;
      grid.highlightedCell.id = "highlighted"; 
    }
  });

  grid.gridDiv.addEventListener("mouseleave", () => {
    grid.highlightedCell.id = "";
  });
}
