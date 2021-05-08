import { Component, OnInit } from '@angular/core';
import {FeaturesService} from '../../../../../services/_feature/features.service';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {IFeature} from '../../../../../models/feature';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';
import {ResponseStatus} from '../../../../../api/response-status';

@Component({
  selector: 'app-dashboard-features-admin',
  templateUrl: './features-admin.component.html',
  styleUrls: ['./features-admin.component.css']
})
export class FeaturesAdminComponent implements OnInit {

  title = 'Admin Dashboard';
  subTitle = 'Característiques';

  features: IFeature[] = [];
  featuresTable: IDashboardTable = {
    data: []
  } as IDashboardTable;
  actionButtons: IActionButtons = {
    active: true,
    resource: 'features',
    actions: { view: false, edit: true, delete: true}
  } as IActionButtons;

  constructor(
    private featuresService: FeaturesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getFeatures();
  }

  private getFeatures(): void {
    this.featuresService.getFeatures().then((response) => {
      if (response.success) {
        this.features = response.data;
      }
    }).then(() => {
      this.setFeaturesTable();
    }).catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private setFeaturesTable(): void {
    this.featuresTable.title = 'Llistat característiques';
    this.featuresTable.inverse = false;
    this.featuresTable.colsName = [
      {colName: 'id', text: 'ID'},
      {colName: 'name', text: 'Nom'},
      {colName: 'num_properties', text: 'Num. propietats'}
    ];

    let aggregate;
    this.features.map(feature => {
      aggregate = feature.properties_count[0] ? feature.properties_count[0].aggregate : 0;
      this.featuresTable.data.push({
        id: feature.id,
        name: feature.name,
        num_properties: aggregate
      });
    });
  }
}
