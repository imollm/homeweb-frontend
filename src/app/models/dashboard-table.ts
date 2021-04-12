interface ITableRow {
  colName: string;
  text: string;
}
export interface IDashboardTable {
  title: string;
  colsName: ITableRow[];
  data: any[];
}
