import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsComponent } from '../components/maps/maps.component';
import { TableComponent } from '../dashboard/components/table/table.component';
import { AgmCoreModule } from '@agm/core';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [MapsComponent, TableComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCNwaQTFTIunXT6r9Ugdk5GowFReVaMdAY'
    }),
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [MapsComponent, TableComponent]
})
export class SharedModule { }
