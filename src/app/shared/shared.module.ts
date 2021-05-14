import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsComponent } from '../components/maps/maps.component';
import { TableComponent } from '../dashboard/components/table/table.component';
import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardComponent } from '../components/layouts/card/card.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [MapsComponent, TableComponent, CardComponent],
    imports: [
        CommonModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCNwaQTFTIunXT6r9Ugdk5GowFReVaMdAY'
        }),
        RouterModule,
        FontAwesomeModule,
        SweetAlert2Module,
    ],
  exports: [MapsComponent, TableComponent, CardComponent]
})
export class SharedModule { }
