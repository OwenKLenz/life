import Grid from "./lib/grid.js";

function countNeighbors(x: number, y: number, rows: Row[]): number {
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
  })

  return count;
}

function isAlive(cell: HTMLDivElement): boolean {
  return cell.className.includes("alive");
}

function assessCells(grid: Grid, deaths: Coord[], births: Coord[]) {
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const cell = grid.rows[y].cells[x];
      const alive = cell.className.includes("alive");
      const neighbors = countNeighbors(x, y, grid.rows);

      if (alive && (neighbors >= 4 || neighbors <= 1)) {
        deaths.push([x, y]);
      } else if (!alive && neighbors === 3) {
        births.push([x, y]);
      }
    }
  }
}

function toggleCells(grid: Grid, births: Coord[], deaths: Coord[]) {
  grid.killCells(deaths);
  grid.birthCells(births);
}

export default function lifeCycle(grid: Grid, pauseFunction) {
  let frozen = false;
  const deaths: Coord[] = [];
  const births: Coord[] = [];

  assessCells(grid, deaths, births);

  if (births.length === 0 && deaths.length === 0) {
    frozen = true;
  }

  if (frozen) {
    pauseFunction();
  } else {
    toggleCells(grid, births, deaths);
  }
}

