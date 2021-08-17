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
export const cellHoverHighlighting = (grid) => {
    grid.gridDiv.addEventListener("mouseover", (event) => {
        if (grid.highlightedCell) {
            unHighlightCell(grid);
        }
        const target = event.target;
        if (target.className.includes("cell")) {
            grid.highlightedCell = event.target;
            highlightCell(grid);
        }
    });
    grid.gridDiv.addEventListener("mouseleave", () => {
        unHighlightCell(grid);
    });
};
const highlightCell = (grid) => {
    grid.highlightedCell.style.border = `3px solid ${grid.selectedColor}`;
};
const unHighlightCell = (grid) => {
    grid.highlightedCell.style.border = "";
};
export const attachConfigurationListeners = (config, starter) => {
    const periodSlider = document.getElementById("periodSlider");
    const rulesDiv = document.getElementById("rules");
    periodSlider.addEventListener("input", (e) => {
        const target = e.target;
        debugger;
        config.period = Number(target.value);
        if (config.running) {
            starter.startCycle();
        }
    });
    rulesDiv.addEventListener("input", (e) => {
        e.preventDefault();
        const target = e.target;
        const rule = target.name;
        if (rule && target.value) {
            config[rule] = Number(target.value);
        }
    });
};
export const attachResetRules = (config) => {
    const defaults = {
        overcrowded: 4,
        undercrowded: 1,
        barryWhiteMusic: 3,
    };
    const resetRulesButton = document.getElementById("resetRules");
    resetRulesButton.addEventListener("click", () => {
        const rules = [...document.getElementsByClassName("rule")];
        rules.forEach((rule) => {
            const originalValue = defaults[rule.name];
            config[rule.name] = originalValue;
            rule.value = originalValue;
        });
    });
};
//# sourceMappingURL=event-listeners.js.map