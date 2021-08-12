function countNeighbors(x, y, rows) {
    const neighborCoords = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ];
    let count = 0;
    neighborCoords.forEach(([xOffset, yOffset]) => {
        const row = rows[yOffset + y];
        const neighborCell = row && row.cells[xOffset + x];
        if (neighborCell && isAlive(neighborCell)) {
            count += 1;
        }
    });
    return count;
}
function isAlive(cell) {
    return cell.className.includes("alive");
}
function assessCells(grid, deaths, births) {
    for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
            const cell = grid.rows[y].cells[x];
            const alive = cell.className.includes("alive");
            const neighbors = countNeighbors(x, y, grid.rows);
            if (alive && (neighbors >= 4 || neighbors <= 1)) {
                deaths.push({ x, y });
            }
            else if (!alive && neighbors === 3) {
                births.push({ x, y });
            }
        }
    }
}
function toggleCells(grid, births, deaths) {
    grid.birthCells(births);
    grid.killCells(deaths);
}
export default function lifeCycle(grid, pauseFunction) {
    let frozen = false;
    const deathCoords = [];
    const birthCoords = [];
    assessCells(grid, deathCoords, birthCoords);
    if (birthCoords.length === 0 && deathCoords.length === 0) {
        frozen = true;
    }
    if (frozen) {
        pauseFunction();
    }
    else {
        toggleCells(grid, birthCoords, deathCoords);
    }
}
//# sourceMappingURL=cycle.js.map