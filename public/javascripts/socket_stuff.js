const socket = io();

export const attachSocketHandler = (grid) => {
  socket.on("new grid", function (gridJSON) {
    const newGrid = JSON.parse(gridJSON);
    grid.reset();
    grid.birthCells(newGrid);

    console.log(newGrid);
  })
}

export const emitGridState = (liveCells) => {
  socket.emit("grid click", JSON.stringify(liveCells));
}
