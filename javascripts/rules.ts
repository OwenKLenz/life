/*
Init Kills HTMLDiv[]
Init Births HTMLDiv[]

For each cell in grid
Count neighbors that are alive

switch(count)
case 0-1 or 4:
  Add cell to kills
case 3:
  Add cell to births
*/

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

  neighborCoords.forEach(([yOffset, xOffset]) => {
    const neighborCell = rows[yOffset + y].cells[xOffset + x];

    if (isAlive(neighborCell)) {
      count += 1;
    }
  })

  return count;
}

function isAlive(cell: HTMLDivElement): boolean {
  return cell.className.includes("alive");
}

function assessCells(grid: Grid, deaths: HTMLDivElement[], births: HTMLDivElement[]) {
  for (let i = 0; i < grid.height; i++) {
    for (let j = 0; j < grid.width; j++) {
      const cell = grid.rows[i].cells[j];
      const neighbors = countNeighbors(i, j, grid.rows);
      if (neighbors >= 4 || neighbors === 0 || neighbors === 1) {
        deaths.push(cell);
      } else if (neighbors === 3) {
        births.push(cell);
      }
    }
  }
}
function toggleCells(grid: Grid, births: HTMLDivElement[], deaths: HTMLDivElement[]): void {
  grid.killCells(deaths);
  grid.birthCells(births);
}

export default function lifeCycle(grid: Grid) {
  const deaths: HTMLDivElement[] = [];
  const births: HTMLDivElement[] = [];

  assessCells(grid, deaths, births);
  toggleCells(grid, births, deaths);
}

