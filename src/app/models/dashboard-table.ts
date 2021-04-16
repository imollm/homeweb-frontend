interface ITableCol {
  colName: string;
  text: string;
}
export interface IDashboardTable {
  title: string;
  colsName: ITableCol[];
  data: any;
  inverse?: boolean;
}
