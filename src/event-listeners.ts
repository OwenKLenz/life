import { emitGridState } from "./socket_stuff.js";
import Grid from "./classes/grid";
import Starter from "./classes/starter";

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
  const gridDiv = document.getElementById("grid")!;

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
      unHighlightCell(grid)
    }

    const target = event.target as HTMLDivElement;

    if (target.className.includes("cell")) {
      grid.highlightedCell = event.target as HTMLDivElement;
      highlightCell(grid);
    }
  });

  grid.gridDiv.addEventListener("mouseleave", () => {
    unHighlightCell(grid);
  });
}

const highlightCell = (grid: Grid) => {
  grid.highlightedCell.style.border = `3px solid ${grid.selectedColor}`
 
}

const unHighlightCell = (grid: Grid) => {
  grid.highlightedCell.style.border = "";
}

export const attachConfigurationListeners = (config: Config, starter: Starter) => {
  const periodSlider = document.getElementById("periodSlider");
  const rulesDiv = document.getElementById("rules");

  periodSlider.addEventListener("input", (e: Event) => {
    const target = e.target as HTMLInputElement;
    debugger;
    config.period = Number(target.value);
    if (config.running) {
      starter.startCycle();
    }
  })

  rulesDiv.addEventListener("input", (e: Event) => {
    e.preventDefault();

    const target = e.target as HTMLInputElement;
    const rule = target.name;

    if (rule && target.value) {
      config[rule] = Number(target.value);
    }
  })
}

export const attachResetRules = (config: Config) => {
  const defaults = {
    overcrowded: 4,
    undercrowded: 1,
    barryWhiteMusic: 3,
  }

  const resetRulesButton = document.getElementById("resetRules");

  resetRulesButton.addEventListener("click", () => {
    const rules = [...document.getElementsByClassName("rule")];

    rules.forEach((rule: HTMLInputElement) => {
      const originalValue = defaults[rule.name];
      config[rule.name] = originalValue; 
      rule.value = originalValue;
    })
  })
}
