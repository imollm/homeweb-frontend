import { Component, OnInit } from '@angular/core';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {CategoriesService} from '../../../../../services/_category/categories.service';
import {AlertService} from '../../../../../_alert/alert.service';
import {Color, Label, SingleDataSet} from 'ng2-charts';

@Component({
  selector: 'app-dashboard-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.css']
})
export class CategoriesAdminComponent implements OnInit {

  title = 'Admin Dashboard';
  subTitle = 'Categories';

  categoriesTable: IDashboardTable = {} as IDashboardTable;
  categoriesTableActions = true;

  chartData: SingleDataSet[] = [];
  chartLabels: Label[] = [];
  chartColors: Color[] = [{
    backgroundColor: [] = []
  }];
  chartLegend = false;

  constructor(
    private categoriesService: CategoriesService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.categoriesService.getAllCategories().then((response) => {
      if (response.success) {
        this.categoriesTable.title = 'Llistat de totes les categories';
        this.categoriesTable.colsName = [
          {colName: 'id', text: 'ID'},
          {colName: 'name', text: 'Nom'},
          {colName: 'num_properties', text: 'Num. propietats'}
        ];
        this.formatPropertiesCountAndSetChartData(response.data);
      }
    }).catch((error) => {
      this.alertService.error('Something went wrong');
      console.error(error);
    });
  }

  private formatPropertiesCountAndSetChartData(data: any): void {
    const colorsOfChart = [];
    let randomColor = '';
    data.map((category) => {
      if (category.hasOwnProperty('properties_count')) {
        if (category.properties_count.length > 0) {
          category.num_properties = category.properties_count[0].aggregate;
        } else {
          category.num_properties = 0;
        }
        this.chartLabels.push(category.name);
        this.chartData.push(category.num_properties);
        randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        colorsOfChart.push(randomColor);
      }
    });
    this.categoriesTable.data = data;
    this.chartColors[0].backgroundColor = colorsOfChart;
  }
}
