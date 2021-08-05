import Grid from "./lib/grid.js";
import Starter from "./lib/starter.js";
import { attachResetListener, attachGridInteractionEvents } from "./event-listeners.js";
import lifeCycle from "./cycle.js";
import { attachSocketHandler } from "./socket_stuff.js";
document.addEventListener("DOMContentLoaded", () => {
    const period = 300;
    const gridObject = new Grid();
    const starter = new Starter(period, (pauseFunction) => {
        lifeCycle(gridObject, pauseFunction);
    });
    // grid.birthCells([[10, 10], [11, 10],[12, 10]]);
    attachResetListener(gridObject.reset.bind(gridObject));
    attachGridInteractionEvents(gridObject);
    attachSocketHandler(gridObject, starter);
});
//# sourceMappingURL=life.js.map