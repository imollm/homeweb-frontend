import { Component, OnInit } from '@angular/core';
import { IProperty } from '../../../../models/property';
import { PropertiesService } from '../../../../services/_property/properties.service';
import { AlertService } from '../../../../services/_alert/alert.service';
import { ResponseStatus } from '../../../../api/response-status';

@Component({
  selector: 'app-dashboard-home-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  title = 'Customer Dashboard';
  subTitle = 'Home';

  properties: IProperty[] = [];

  constructor(
    private propertiesService: PropertiesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getPropertiesForSale();
  }

  private getPropertiesForSale(): void {
    this.propertiesService.getForSaleProperties().then((response) => {
      if (response.success) {
        this.properties = response.data;
      } else {
        this.alertService.warn(response.message);
      }
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.log(error);
    });
  }

}
