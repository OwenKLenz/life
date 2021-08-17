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
    for (let i = 0; i < colors.length; i++) {
        const picker = colors[i];
        const color = picker.dataset.color;
        picker.style.backgroundColor = color;
        picker.addEventListener("click", () => {
            grid.selectedColor = color;
        });
    }
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