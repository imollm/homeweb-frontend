import { Component, OnInit } from '@angular/core';
import {PropertiesService} from '../../../../services/_property/properties.service';
import {IProperty} from '../../../../models/property';
import {ResponseStatus} from '../../../../api/response-status';
import {AlertService} from '../../../../services/_alert/alert.service';
import {IDashboardCard} from '../../../../models/dashboard-card';
import {HelpersService} from '../../../../services/_helpers/helpers.service';

@Component({
  selector: 'app-dashboard-home-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  title = 'Owner Dashboard';
  subTitle = 'Home';

  propertiesRegistered: IProperty[] = [];
  visibleProperties: IProperty[] = [];
  sealedProperties: IProperty[] = [];
  totalSealedAmount: number;

  propertiesRegisteredCard: IDashboardCard = {} as IDashboardCard;
  visiblePropertiesCard: IDashboardCard = {} as IDashboardCard;
  sealedPropertiesCard: IDashboardCard = {} as IDashboardCard;
  totalSealedAmountCard: IDashboardCard = {} as IDashboardCard;

  constructor(
    private propertiesService: PropertiesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getMyProperties();
  }

  private getMyProperties(): void {
    this.propertiesService.getMyProperties().then((response) => {
      if (response.success) {
        this.propertiesRegistered = response.data.properties;
        this.visibleProperties = response.data.visible_properties;
        this.sealedProperties = response.data.sealed_properties;
        this.totalSealedAmount = response.data.total_sealed_amount;
      }
    }).then(() => {
      this.setCardsInfo();
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private setCardsInfo(): void {
    this.propertiesRegisteredCard.title = 'Total propietats registrades';
    this.propertiesRegisteredCard.value = this.propertiesRegistered.length.toString();
    this.visiblePropertiesCard.title = 'Propietats visibles';
    this.visiblePropertiesCard.value = this.visibleProperties.length.toString();
    this.sealedPropertiesCard.title = 'Propietats venudes';
    this.sealedPropertiesCard.value = this.sealedProperties.length.toString();
    this.totalSealedAmountCard.title = 'Total amb € venut';
    this.totalSealedAmountCard.value = HelpersService.formatPrice(this.totalSealedAmount);
  }
}
