export default class Grid {
    constructor(width = 100, height = 100) {
        this.gridDiv = document.getElementById("grid");
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
    createRow(yCoord) {
        const newRow = {
            rowDiv: document.createElement('div'),
            cells: [],
        };
        for (let x = 0; x < this.width; x++) {
            const newCell = this.createCell(x, yCoord);
            newRow.cells.push(newCell);
            newRow.rowDiv.appendChild(newCell);
        }
        return newRow;
    }
    createCell(xCoord, yCoord) {
        const newCell = document.createElement('div');
        newCell.dataset.xCoord = xCoord.toString();
        newCell.dataset.yCoord = yCoord.toString();
        newCell.className = "cell";
        return newCell;
    }
    getLiveCellCoords() {
        return Object.keys(this.cellMap).map((key) => {
            return this.cellMap[key];
        });
        // for (let y = 0; y < this.height; y++) {
        //   for (let x = 0; x < this.width; x++) {
        //     if (this.rows[y].cells[x].className.includes("alive")) {
        //       liveCellCoords.push([x, y]);
        //     }
        //   }
        // }
    }
    killCells(cellCoords) {
        cellCoords.forEach(([x, y]) => {
            const cell = this.fetchCell(x, y);
            cell.className = "cell";
            delete this.cellMap[this.coordsToKey([x, y])];
        });
    }
    birthCells(cellCoords) {
        cellCoords.forEach(([x, y]) => {
            const cell = this.fetchCell(x, y);
            cell.className = "cell alive";
            this.cellMap[this.coordsToKey([x, y])] = [x, y];
        });
    }
    reset() {
        this.getLiveCellCoords().forEach(([x, y]) => {
            this.fetchCell(x, y).className = "cell";
        });
        this.cellMap = {};
    }
    fetchCell(x, y) {
        return this.rows[y].cells[x];
    }
    coordsToKey(coordPair) {
        return coordPair.toString();
    }
}
//# sourceMappingURL=grid.js.map