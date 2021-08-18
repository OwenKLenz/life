export default class Grid {
    constructor(width = 100, height = 100) {
        this.selectedColor = "rgb(0, 0, 255)";
        this.deadColor = "rgb(0, 0, 0)";
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
    createRow(y) {
        const newRow = {
            rowDiv: document.createElement('div'),
            cells: [],
        };
        for (let x = 0; x < this.width; x++) {
            const newCell = this.createCellDiv(x, y);
            newRow.cells.push(newCell);
            newRow.rowDiv.appendChild(newCell);
        }
        return newRow;
    }
    createCellDiv(xCoord, yCoord) {
        const newCell = document.createElement('div');
        newCell.dataset.xCoord = xCoord.toString();
        newCell.dataset.yCoord = yCoord.toString();
        newCell.style.backgroundColor = this.deadColor;
        newCell.className = "cell";
        return newCell;
    }
    getLiveCellCoords() {
        return Object.keys(this.cellMap).map((key) => {
            return this.cellMap[key];
        });
    }
    killCells(cellCoords) {
        cellCoords.forEach(({ x, y }) => {
            const cell = this.fetchCell(x, y);
            cell.className = "cell";
            cell.style.backgroundColor = this.deadColor;
            delete this.cellMap[this.coordsToKey([x, y])];
        });
    }
    birthCells(cellCoords, fromClick = false) {
        cellCoords.forEach(({ x, y, color }) => {
            const cell = this.fetchCell(x, y);
            if (!fromClick) {
                color = color || this.calculateColorFromNeighbors(x, y);
                cell.style.backgroundColor = color;
            }
            else {
                color = this.selectedColor;
                cell.style.backgroundColor = color;
            }
            cell.className = "cell alive";
            this.cellMap[this.coordsToKey([x, y])] = { x, y, color };
        });
    }
    reset() {
        this.getLiveCellCoords().forEach(({ x, y }) => {
            const cell = this.fetchCell(x, y);
            cell.className = "cell";
            cell.style.backgroundColor = this.deadColor;
        });
        this.cellMap = {};
    }
    calculateColorFromNeighbors(x, y) {
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
        });
        const finalRed = redSum / colorCount;
        const finalGreen = greenSum / colorCount;
        const finalBlue = blueSum / colorCount;
        return `rgb(${String(finalRed)}, ${String(finalGreen)}, ${String(finalBlue)})`;
    }
    rgbToValues(rgb) {
        const colors = rgb.split(/\D+/g);
        let red = Number(colors[1]);
        let green = Number(colors[2]);
        let blue = Number(colors[3]);
        return [red, green, blue];
    }
    fetchCell(x, y) {
        return this.rows[y].cells[x];
    }
    coordsToKey(coordPair) {
        return coordPair.toString();
    }
}
//# sourceMappingURL=grid.js.map