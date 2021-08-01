import Grid from "./lib/grid.js";
import { attachCellToggling } from "./event-listeners.js";
import lifeCycle from ".rules.js";

document.addEventListener("DOMContentLoaded", () => {
  const grid = new Grid(75, 75);
  attachCellToggling();
  grid.birthCell(5, 20);
})
