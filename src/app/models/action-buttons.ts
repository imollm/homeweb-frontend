interface IActions {
  view: boolean;
  edit: boolean;
  delete: boolean;
}
export interface IActionButtons {
  active: boolean;
  resource: string;
  actions: IActions;
}
