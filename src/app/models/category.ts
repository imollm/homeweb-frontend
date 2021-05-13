import {SafeUrl} from '@angular/platform-browser';

export interface ICategory {
  id: string;
  name: string;
  image: string;
  imageBase64: SafeUrl;
}
