import {Component, Input, OnInit} from '@angular/core';
import {CategoriesService} from '../../../../../services/_category/categories.service';
import {ActivatedRoute} from '@angular/router';
import {ICategory} from '../../../../../models/category';
import {IProperty} from '../../../../../models/property';
import {IDashboardCard} from '../../../../../models/dashboard-card';
import {Color, Label, SingleDataSet} from 'ng2-charts';
import {HelpersService} from '../../../../../services/_helpers/helpers.service';
import {ChartOptions} from 'chart.js';
import {AlertService} from '../../../../../services/_alert/alert.service';
import {ResponseStatus} from '../../../../../api/response-status';
import {ImageService} from '../../../../../services/_image/image.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  categoryId: string;
  category: ICategory;
  properties: IProperty[] = {} as IProperty[];
  chartData: SingleDataSet[] = [];
  chartLabels: Label[] = [];
  chartColors: Color[] = [{
    backgroundColor: [] = []
  }];
  chartLegend = false;
  chartOptions: (ChartOptions & { annotation: any }) = {
    annotation: undefined,
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [{
        id: 'y-axis-0',
        position: 'left',
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }]
    },
    title: {
      display: false,
      text: ''
    }
  };

  @Input() totalPropertiesCard: IDashboardCard = {} as IDashboardCard;

  constructor(
    private categoriesService: CategoriesService,
    private activateRoute: ActivatedRoute,
    private alertService: AlertService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.categoryId = this.activateRoute.snapshot.params.id;
    this.getCategory();
  }

  private getCategory(): void {
    this.categoriesService.getPropertiesByCategoryId(this.categoryId).then((response) => {
      this.category = response.data[0].category;
      this.properties = response.data[0].category.properties;
    }).then(() => {
      this.totalProperties();
    }).then(() => {
      this.chartPropertyPrices();
    }).then(() => {
      if (this.category.image) {
        this.getImage();
      }
    })
      .catch((error) => {
      this.alertService.error(ResponseStatus.displayErrorMessage(error));
      console.error(error);
    });
  }

  private getImage(): void {
    if (this.category.image) {
      this.imageService.sanitizeBase64EncodedImage(this.category.image, 'categories').then((imageDecoded) => {
        this.category.imageBase64 = imageDecoded;
      });
    }
  }

  private totalProperties(): void {
    this.totalPropertiesCard.title = 'Propietats totals';
    this.totalPropertiesCard.value = this.properties.length.toString();
  }

  private chartPropertyPrices(): void {
    if (this.properties.length > 0) {
      this.categoriesService.getPropertiesGroupByPrice(this.categoryId).then((response) => {
        if (response.success) {
          const data = response.data;
          const colors = [];
          data.map((element) => {
            this.chartData.push(element.count);
            this.chartLabels.push(HelpersService.formatPrice(element.price));
            colors.push(HelpersService.randomColor());
          });
          this.chartColors[0].backgroundColor = colors;
        }
      });
    }
  }
}
