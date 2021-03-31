import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../../services/_category/categories.service';
import {ICategory} from '../../models/category';
import {AlertService} from '../../_alert/alert.service';
import {EndPointMapper} from '../../api/end-point-mapper';
import {ImageService} from '../../services/_image/image.service';
import {ApiResponseI} from '../../models/api-response';
import {DomSanitizer} from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getCategories().then(() => {
      this.categories.map((category) => {
        this.getBase64ImageEncoded(category.image).then(base64ImageEncoded => {
          const objectUrl = 'data:image/' + this.imageService.getImageExtension(category.image) + ';base64,' + base64ImageEncoded;
          category.safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
        });
      });
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

  async getBase64ImageEncoded(id: string): Promise<any> {
    const base64Encoded = await this.imageService.getImage('categories', id);
    return base64Encoded.data;
  }
}
