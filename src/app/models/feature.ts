import {IProperty} from './property';

export interface IFeature {
  id: number;
  name: string;
  properties_count?: any[];
  properties?: IProperty[];
}
