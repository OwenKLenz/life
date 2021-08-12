type Row = {
  rowDiv: HTMLDivElement
  cells: HTMLDivElement[]
}

// type Coord = [number, number]

type Coord = {
  x: number,
  y: number,
  color?: string
}

type LiveCellMap = {
  [key: string]: Coord
}
