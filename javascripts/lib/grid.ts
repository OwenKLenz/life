export default class Grid {
  gridDiv: HTMLDivElement;
  width: number;
  height: number;
  rows: Row[];

  constructor(width: number = 100, height: number = 100) {
    this.gridDiv = document.getElementById("grid") as HTMLDivElement;
    this.width = width;
    this.height = height;
    this.rows = [];
    this.createRows();
  }

  createRows() {
    for (let i = 0; i < this.height; i++) {
      const row = this.createRow();
      this.rows.push(row);
      this.gridDiv.appendChild(row.rowDiv);
    } 
  }

  createRow(): Row {
    const newRow: Row = {
      rowDiv: document.createElement('div'),
      cells: [],
    }

    for (let i = 0; i < this.width; i++) {
      const newCell = this.createCell();
      newRow.cells.push(newCell);
      newRow.rowDiv.appendChild(newCell);
    } 

    return newRow;
  }

  createCell(): HTMLDivElement {
    const newCell = document.createElement('div');
    newCell.className = "cell dead";
    return newCell;
  }

  killCells(cells: HTMLDivElement[]) {
    cells.forEach(cell => {
      cell.className = "cell";
    })
  }

  birthCells(cells: HTMLDivElement[]) {
    cells.forEach(cell => {
      cell.className = "cell alive";
    })
  }
}
