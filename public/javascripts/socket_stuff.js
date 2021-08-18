const socket = io();
export const attachSocketHandler = (grid, starter) => {
    socket.on("initial grid", (gridState) => {
        grid.birthCells(gridState);
    });
    socket.on("new grid", (newGrid) => {
        grid.reset();
        grid.birthCells(newGrid);
    });
    socket.on("start-stop", (msg) => {
        msg === "start" ?
            starter.startCycle()
            :
                starter.stopCycle();
    });
};
export const emitGridState = (liveCells) => {
    socket.emit("grid click", liveCells);
};
export const emitStartStop = (msg) => {
    socket.emit("start-stop", msg);
};
//# sourceMappingURL=socket_stuff.js.map