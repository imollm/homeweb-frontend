import { Component, OnInit } from '@angular/core';
import {Property} from '../../models/property';
import {CategoriesService} from '../../services/_category/categories.service';
import {MessageService} from '../../services/message.service';
import {ImageService} from '../../services/_image/image.service';
import {HelpersService} from '../../services/_helpers/helpers.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private categoriesService: CategoriesService,
    private imageService: ImageService
  ) { }

  properties: Property[] = [];
  property: Property;
  category: string;

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
            property.price = HelpersService.formatPrice(property.price);
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

  sendProperty(evt: EventTarget): void {
    const promise =  new Promise(resolve => {
      const propertyId = (evt as HTMLElement).getAttribute('datatype');
      this.properties.map(p => {
        if (p.id === parseInt(propertyId, 10)) {
          resolve(p);
        }
      });
    });
    promise.then((property) => {
      this.messageService.changeMessage(property);
    });
  }
}
