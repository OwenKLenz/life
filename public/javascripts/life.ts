import Grid from "./lib/grid.js";
import Starter from "./lib/starter.js";
import {
  attachColorSelect,
  attachResetListener, 
  attachGridInteractionEvents, 
  attachConfigurationListeners,
  attachResetRules,
} from "./event-listeners.js";
import lifeCycle from "./cycle.js";
import { attachSocketHandler } from "./socket_stuff.js";

document.addEventListener("DOMContentLoaded", () => {
  const config = {
    period: 300,
    undercrowded: 1,
    overcrowded: 4,
    barryWhiteMusic: 3,
    running: false,
  }

  const gridObject = new Grid(80, 80);
  const starter = new Starter(config,
                              (pauseFunction: Function) => {
                                lifeCycle(gridObject, pauseFunction, config)
                              })

  attachConfigurationListeners(config, starter);
  attachColorSelect(gridObject);
  attachResetListener(gridObject.reset.bind(gridObject));
  attachGridInteractionEvents(gridObject);
  attachSocketHandler(gridObject, starter);
  attachResetRules(config);
})
