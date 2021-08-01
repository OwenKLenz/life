export default class Grid {
    constructor(width = 100, height = 100) {
        this.gridDiv = document.getElementById("grid");
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
    createRow() {
        const newRow = {
            rowDiv: document.createElement('div'),
            cells: [],
        };
        for (let i = 0; i < this.width; i++) {
            const newCell = this.createCell();
            newRow.cells.push(newCell);
            newRow.rowDiv.appendChild(newCell);
        }
        return newRow;
    }
    createCell() {
        const newCell = document.createElement('div');
        newCell.className = "cell dead";
        return newCell;
    }
    killCell(x, y) {
        this.rows[y].cells[x].className = "cell";
    }
    birthCell(x, y) {
        this.rows[y].cells[x].className = "cell alive";
    }
}
//# sourceMappingURL=grid.js.map