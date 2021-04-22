export interface ILocation {
  lat: number;
  lng: number;
}
export interface IMaps {
  location: ILocation;
  markers?: ILocation[];
  zoom: number;
  mapType: string;
  getLocation: boolean;
}
