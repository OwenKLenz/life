type Row = {
  rowDiv: HTMLDivElement
  cells: HTMLDivElement[]
}

type Coord = [number, number]

type LiveCellMap = {
  [key: string]: Coord
}
