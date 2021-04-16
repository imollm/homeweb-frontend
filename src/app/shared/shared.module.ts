import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsComponent } from '../components/maps/maps.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [MapsComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCNwaQTFTIunXT6r9Ugdk5GowFReVaMdAY'
    }),
  ],
  exports: [MapsComponent]
})
export class SharedModule { }
