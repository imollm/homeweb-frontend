import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsComponent } from '../components/maps/maps.component';
import { TableComponent } from '../dashboard/components/table/table.component';
import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardComponent } from '../components/layouts/card/card.component';

@NgModule({
  declarations: [MapsComponent, TableComponent, CardComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCNwaQTFTIunXT6r9Ugdk5GowFReVaMdAY'
    }),
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [MapsComponent, TableComponent, CardComponent]
})
export class SharedModule { }
