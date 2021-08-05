import { emitGridState } from "./socket_stuff.js";
import Grid from "./lib/grid";

const cellClickHandler = (e: Event, grid: Grid) => {
  const target = e.target as HTMLDivElement;

  const { xCoord, yCoord } = target.dataset;

  if (target.className.includes("cell")) {
    const cellCoords = [Number(xCoord), Number (yCoord)];

    if (target.className.includes("alive")) {
      grid.killCells([cellCoords] as Coord[]);
    } else {
      grid.birthCells([cellCoords] as Coord[]);
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

// const detachCellToggling = () => {
  // const grid = document.getElementById("grid") as HTMLDivElement;

  // grid.removeEventListener("click", cellClickHandler, true);
// }

export const attachStartStop = (loopFunction, timePeriod: number) => {
  const startStopButton = document.getElementById("start-stop");
  let intervalId: number;

  const pauseCycle = () => {
    startStopButton.innerText = "Start";
    clearInterval(intervalId);
    intervalId = undefined;
  }

  const startCycle = () => {
    startStopButton.innerText = "Stop";
    intervalId = setInterval(() => loopFunction(pauseCycle), timePeriod);
  }

  startStopButton.addEventListener("click", () => {
    if(startStopButton.innerText === "Start") {
      startCycle();
    } else {
      pauseCycle();
    }

    // const target = e.target as HTMLDivElement;

    // if (target.className.includes("cell")) {
    //   target.className =
    //     target.className.includes("alive") ? "cell" : "cell alive";
    // }
  })
}
