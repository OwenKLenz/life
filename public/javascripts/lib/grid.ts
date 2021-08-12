export default class Grid {
  gridDiv: HTMLDivElement;
  width: number;
  height: number;
  rows: Row[];
  cellMap: LiveCellMap;
  selectedColor: string;
  deadColor: string;

  constructor(width: number = 100, height: number = 100) {
    this.selectedColor = "rgb(0, 0, 255)";
    this.deadColor = "rgb(0, 0, 0)";
    this.gridDiv = document.getElementById("grid") as HTMLDivElement;
    this.width = width;
    this.height = height;
    this.rows = [];
    this.createRows();
    this.cellMap = {};
  }

  createRows() {
    for (let y = 0; y < this.height; y++) {
      const row = this.createRow(y);
      this.rows.push(row);
      this.gridDiv.appendChild(row.rowDiv);
    } 
  }

  createRow(y: number): Row {
    const newRow: Row = {
      rowDiv: document.createElement('div'),
      cells: [],
    }

    for (let x = 0; x < this.width; x++) {
      const newCell = this.createCellDiv(x, y);
      newRow.cells.push(newCell);
      newRow.rowDiv.appendChild(newCell);
    } 

    return newRow;
  }

  createCellDiv(xCoord: number, yCoord: number): HTMLDivElement {
    const newCell = document.createElement('div');
    newCell.dataset.xCoord = xCoord.toString();
    newCell.dataset.yCoord = yCoord.toString();
    newCell.style.backgroundColor = this.deadColor;
    newCell.className = "cell";
    return newCell;
  }

  getLiveCellCoords(): Coord[] {
    return Object.keys(this.cellMap).map((key) => {
      return this.cellMap[key];
    });
  }

  killCells(cellCoords: Coord[]) {
    cellCoords.forEach(({x, y}) => {
      const cell = this.fetchCell(x, y);
      cell.className = "cell";
      cell.style.backgroundColor = this.deadColor;
      delete this.cellMap[this.coordsToKey([x, y])];
    })
  }

  birthCells(cellCoords: Coord[], fromClick: boolean = false) {
    cellCoords.forEach(({x, y, color}) => {
      const cell = this.fetchCell(x, y);

      if (!fromClick) {
        color = color || this.calculateColorFromNeighbors(x, y);
        cell.style.backgroundColor = color;
      } else {
        color = this.selectedColor;
        cell.style.backgroundColor = color;
      }

      cell.className = "cell alive";
      this.cellMap[this.coordsToKey([x, y])] = {x, y, color};
    })
  }

  reset() {
    this.getLiveCellCoords().forEach(({x, y}) => {
      const cell = this.fetchCell(x, y);
      cell.className = "cell";
      cell.style.backgroundColor = this.deadColor;
    })

    this.cellMap = {};
  }

  private calculateColorFromNeighbors(x: number, y: number): string {
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

    let colorCount = 0;
    let redSum = 0;
    let greenSum = 0;
    let blueSum = 0;

    
    neighborCoords.forEach(([xOffset, yOffset]) => {
      const row = this.rows[yOffset + y];
      const neighborCell = row && row.cells[xOffset + x];

      if (neighborCell && neighborCell.className.includes("alive")) {
        colorCount += 1;
        const rgbColor = neighborCell.style.backgroundColor;
        const colorValues = this.rgbToValues(rgbColor);
        redSum += colorValues[0];
        greenSum += colorValues[1];
        blueSum += colorValues[2];
      }
    })

    const finalRed = redSum / colorCount;
    const finalGreen = greenSum / colorCount;
    const finalBlue = blueSum / colorCount;

    return `rgb(${String(finalRed)}, ${String(finalGreen)}, ${String(finalBlue)})`;
  }

  private rgbToValues(rgb: string): number[] {
    const colors = rgb.split(/\D+/g)
    let red = Number(colors[1]);
    let green = Number(colors[2]);
    let blue = Number(colors[3]);

    return [red, green, blue];
  }

  private fetchCell(x: number, y: number): HTMLDivElement {
    return this.rows[y].cells[x];
  }

  private coordsToKey(coordPair: number[]) {
    return coordPair.toString();
  }
}
