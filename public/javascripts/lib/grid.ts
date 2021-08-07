export default class Grid {
  gridDiv: HTMLDivElement;
  width: number;
  height: number;
  rows: Row[];
  cellMap: LiveCellMap;

  constructor(width: number = 100, height: number = 100) {
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

  createRow(yCoord: number): Row {
    const newRow: Row = {
      rowDiv: document.createElement('div'),
      cells: [],
    }

    for (let x = 0; x < this.width; x++) {
      const newCell = this.createCell(x, yCoord);
      newRow.cells.push(newCell);
      newRow.rowDiv.appendChild(newCell);
    } 

    return newRow;
  }

  createCell(xCoord: number, yCoord: number): HTMLDivElement {
    const newCell = document.createElement('div');
    newCell.dataset.xCoord = xCoord.toString();
    newCell.dataset.yCoord = yCoord.toString();
    newCell.className = "cell";
    return newCell;
  }

  getLiveCellCoords(): Coord[] {
    return Object.keys(this.cellMap).map((key) => {
      return this.cellMap[key];
    });
  }

  killCells(cellCoords: Coord[]) {
    cellCoords.forEach(([x, y]) => {
      const cell = this.fetchCell(x, y);
      cell.className = "cell";
      delete this.cellMap[this.coordsToKey([x, y])];
    })
  }

  birthCells(cellCoords: Coord[]) {
    cellCoords.forEach(([x, y]) => {
      const cell = this.fetchCell(x, y);
      cell.className = "cell alive";
      this.cellMap[this.coordsToKey([x, y])] = [x, y];
    })
  }

  reset() {
    this.getLiveCellCoords().forEach(([x, y]) => {
      this.fetchCell(x, y).className = "cell";
    })

    this.cellMap = {};
  }

  private fetchCell(x: number, y: number): HTMLDivElement {
    return this.rows[y].cells[x];
  }

  private coordsToKey(coordPair: Coord) {
    return coordPair.toString();
  }
}
