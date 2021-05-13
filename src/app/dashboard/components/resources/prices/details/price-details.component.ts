import { Component, OnInit } from '@angular/core';
import {HelpersService} from '../../../../../services/_helpers/helpers.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label, SingleDataSet} from 'ng2-charts';
import {PricesService} from '../../../../../services/_price/prices.service';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {IPriceChange} from '../../../../../models/price-change';
import {ActivatedRoute} from '@angular/router';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {IActionButtons} from '../../../../../models/action-buttons';
import {ResponseStatus} from '../../../../../api/response-status';

@Component({
  selector: 'app-price-details',
  templateUrl: './price-details.component.html',
  styleUrls: ['./price-details.component.css']
})
export class PriceDetailsComponent implements OnInit {

  propertyId: string;
  changes: IPriceChange[] = [];
  propertyRef: string;

  pricesTable: IDashboardTable = {} as IDashboardTable;
  actionButtons: IActionButtons = {
    active: false
  } as IActionButtons;

  lineChartData: SingleDataSet = [];
  lineChartLabels: Label[] = [];
  lineChartOptions: (ChartOptions & { annotation: any }) = {
    annotation: undefined,
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    }
  };
  lineChartColors: Color[] = [];
  lineChartLegend = false;
  lineChartType: ChartType = 'line';

  constructor(
    private priceService: PricesService,
    private alertService: AlertService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.propertyId = this.activateRoute.snapshot.params.id.toString();
    this.getPriceChangesOfProperty();
  }

  private getPriceChangesOfProperty(): void {
    this.priceService.getPriceChangesByPropertyId(this.propertyId).then((response) => {
      if (response.success) {
        this.changes = response.data;
        this.propertyRef = this.changes[0].property.reference;
      } else {
        this.alertService.warn(response.message);
      }
    }).then(() => this.setPriceChangesTable())
      .then(() => this.setChart())
      .catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private setPriceChangesTable(): void {
    const data = [];
    this.pricesTable.title = 'Canvis de preu propietat ' + this.propertyRef;
    this.pricesTable.inverse = false;
    this.pricesTable.colsName = [
      {colName: 'start', text: 'Inici'},
      {colName: 'amount', text: 'Preu'},
      {colName: 'price', text: 'Preu actual'},
      {colName: 'end', text: 'Fi'}
    ];
    this.changes.map((c) => {
      data.push({
        reference: c.property.reference,
        amount: HelpersService.formatPrice(c.amount),
        price: c.property.price,
        start: c.start,
        end: c.end !== null ? c.end : '-'
      });
      this.pricesTable.data = data;
    });
  }

  private setChart(): void {
    this.changes.forEach((change) => {
      this.lineChartData.push(change.amount);
      this.lineChartLabels.push(HelpersService.formatDate(change.start));
    });
  }
}
