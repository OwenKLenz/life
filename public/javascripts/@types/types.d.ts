type Row = {
  rowDiv: HTMLDivElement
  cells: HTMLDivElement[]
}

type Config = {
  running: boolean,
  period: number,
  undercrowded: number,
  overcrowded: number,
  barryWhiteMusic: number
}

type Coord = {
  x: number,
  y: number,
  color?: string
}

type LiveCellMap = {
  [key: string]: Coord
}
