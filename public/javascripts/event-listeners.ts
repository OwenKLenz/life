import { emitGridState } from "./socket_stuff.js";
import Grid from "./lib/grid";
import Starter from "./lib/starter";

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
