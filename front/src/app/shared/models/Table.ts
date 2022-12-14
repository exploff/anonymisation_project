export interface Table {
  table: string,
  columns: {
    name: string,
    type: string,
    selected: boolean
  }[]
}
