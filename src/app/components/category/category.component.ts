import { Component, OnInit } from '@angular/core';
import {IProperty} from '../../models/property';
import {CategoriesService} from '../../services/_category/categories.service';
import {MessageService} from '../../services/message.service';
import {ImageService} from '../../services/_image/image.service';
import {HelpersService} from '../../services/_helpers/helpers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ICategory} from '../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: ICategory = {} as ICategory;
  categoryId: string;
  properties: IProperty[] = [] as IProperty[];

  constructor(
    private activateRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private imageService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryId = this.activateRoute.snapshot.params.id;
    this.getPropertiesByCategoryId().then(() => { });
  }

  private async getPropertiesByCategoryId(): Promise<any> {
    const response = await this.categoriesService.getPropertiesByCategoryId(this.categoryId);
    if (!response.success) {
      this.router.navigate(['**']);
    } else {
      this.category = response.data[0].category;
      this.properties = response.data[0].category.properties;
      this.properties.map((property) => {
        this.imageService.sanitizeBase64EncodedImage(property.image, 'properties').then((imageDecoded) => {
          property.imageBase64 = imageDecoded;
          property.price = HelpersService.formatPrice(property.price);
        });
      });
    }
  }
}
