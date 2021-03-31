import { Component, OnInit } from '@angular/core';
import {Property} from '../../models/property';
import {CategoriesService} from '../../services/_category/categories.service';
import {MessageService} from '../../services/message.service';
import {ImageService} from '../../services/_image/image.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  properties: Property[] = [];
  property: Property;
  category: string;

  constructor(
    private messageService: MessageService,
    private categoriesService: CategoriesService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.getCategoryRequest().then((msg) => {
      if (msg !== undefined && msg !== null && msg !== '') {
        this.getPropertiesByCategory(msg).then(() => { this.category = msg; });
      }
    });
  }

  private async getPropertiesByCategory(category: string): Promise<any> {
    const response = await this.categoriesService.getPropertiesByCategory(category);
    if (response.success) {
      this.properties = response.data;
      this.properties.map((property) => {
        this.imageService.sanitizeBase64EncodedImage(property.image, 'properties').then((imageDecoded) => {
            property.safeUrl = imageDecoded;
            property.price = this.formatPrice(property.price);
        });
      });
    }
  }

  private getCategoryRequest(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.messageService.currentMessage.subscribe((msg) => {
        resolve(msg);
      });
    });
  }

  private formatPrice(price: number): any {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    });
    return formatter.format(price);
  }
}
