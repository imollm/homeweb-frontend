import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../../services/_category/categories.service';
import {ICategory} from '../../models/category';
import {AlertService} from '../../_alert/alert.service';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ImageService} from '../../services/_image/image.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  title = 'CATEGORIES';
  categories: ICategory[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private alertService: AlertService,
    private endPointMapper: EndPointMapper,
    private imageService: ImageService,
  ) { }

  ngOnInit(): void {
    this.getCategories().then(() => {
      this.getCategoriesImages();
    });
  }

  private async getCategories(): Promise<any> {
    const promise = await this.categoriesService.getAllCategories();

    if (promise.success) {
      this.categories = promise.data;
    } else {
      this.alertService.error(promise.message);
    }
  }

  private getCategoriesImages(): void {
    this.categories.map((category) => {
      this.imageService.sanitizeBase64EncodedImage(category.image).then((imageDecoded) => {
        category.safeUrl = imageDecoded;
      });
    });
  }
}
