import Grid from "./lib/grid.js";
import Starter from "./lib/starter.js";
import { attachColorSelect, attachResetListener, attachGridInteractionEvents } from "./event-listeners.js";
import lifeCycle from "./cycle.js";
import { attachSocketHandler } from "./socket_stuff.js";
document.addEventListener("DOMContentLoaded", () => {
    const period = 100;
    const gridObject = new Grid(80, 80);
    const starter = new Starter(period, (pauseFunction) => {
        lifeCycle(gridObject, pauseFunction);
    });
    attachColorSelect(gridObject);
    attachResetListener(gridObject.reset.bind(gridObject));
    attachGridInteractionEvents(gridObject);
    attachSocketHandler(gridObject, starter);
});
//# sourceMappingURL=life.js.map