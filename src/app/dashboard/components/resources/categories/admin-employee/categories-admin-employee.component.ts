import {Component, Input, OnInit} from '@angular/core';
import {IDashboardTable} from '../../../../../models/dashboard-table';
import {CategoriesService} from '../../../../../services/_category/categories.service';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {Color, Label, SingleDataSet} from 'ng2-charts';
import {IActionButtons} from '../../../../../models/action-buttons';
import {HelpersService} from '../../../../../services/_helpers/helpers.service';

@Component({
  selector: 'app-dashboard-categories-admin-employee',
  templateUrl: './categories-admin-employee.component.html',
  styleUrls: ['./categories-admin-employee.component.css']
})
export class CategoriesAdminEmployeeComponent implements OnInit {

  @Input() role: string;

  title: string;
  subTitle = 'Categories';

  categoriesTable: IDashboardTable = {} as IDashboardTable;
  categoriesTableActions: IActionButtons = {
    active: true,
    resource: 'categories',
    actions: {
      view: true,
      edit: true
    }
  } as IActionButtons;

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
    this.title = this.role === 'admin' ? 'Admin' : 'Employee';
    this.title += ' Dashboard';
    this.categoriesTableActions.actions.delete = this.role === 'admin';
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
    data.map((category) => {
      if (category.hasOwnProperty('properties_count')) {
        if (category.properties_count.length > 0) {
          category.num_properties = category.properties_count[0].aggregate;
        } else {
          category.num_properties = 0;
        }
        this.chartLabels.push(category.name);
        this.chartData.push(category.num_properties);
        colorsOfChart.push(HelpersService.randomColor());
      }
    });
    this.categoriesTable.data = data;
    this.chartColors[0].backgroundColor = colorsOfChart;
  }
}
