const socket = io();

export const attachSocketHandler = (grid, starter) => {
  socket.on("new grid", (gridJSON) => {
    const newGrid = gridJSON;
    grid.reset();
    grid.birthCells(newGrid);

    console.log(newGrid);
  })

  socket.on("start-stop", (msg) => {
    let m = JSON.parse(msg);
    m === "start" ? starter.startCycle() : starter.stopCycle();
  })
}

export const emitGridState = (liveCells) => {
  socket.emit("grid click", liveCells);
}

export const emitStartStop = (msg) => {
  socket.emit("start-stop", msg);
}
