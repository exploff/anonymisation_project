export interface AnonymisationManuel {
  table: string,
  typeAnonymisation: string,
  typeRandomisation: string
  columns: ColumnAnonymisationManuel[],
}

export interface ColumnAnonymisationManuel {
  column: string
  containData: string
}
