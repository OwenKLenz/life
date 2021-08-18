import Grid from "./classes/grid.js";

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

function assessCells(grid: Grid, deaths: Coord[], births: Coord[], config: Config) {
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const cell = grid.rows[y].cells[x];
      const alive = cell.className.includes("alive");
      const neighbors = countNeighbors(x, y, grid.rows);

      if (alive && (neighbors >= config.overcrowded || neighbors <= config.undercrowded)) {
        deaths.push({x, y});
      } else if (!alive && neighbors === config.barryWhiteMusic) {
        births.push({x, y});
      }
    }
  }
}

function toggleCells(grid: Grid, births: Coord[], deaths: Coord[]) {
  grid.birthCells(births);
  grid.killCells(deaths);
}

export default function lifeCycle(grid: Grid, pauseFunction, config: Config) {
  let frozen = false;
  const deathCoords: Coord[] = [];
  const birthCoords: Coord[] = [];

  assessCells(grid, deathCoords, birthCoords, config);

  if (birthCoords.length === 0 && deathCoords.length === 0) {
    frozen = true;
  }

  if (frozen) {
    pauseFunction();
  } else {
    toggleCells(grid, birthCoords, deathCoords);
  }
}

