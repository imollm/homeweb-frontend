import { Component, OnInit } from '@angular/core';
import {Property} from '../../models/property';
import {CategoriesService} from '../../services/_category/categories.service';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  properties: Property[] = [];

  constructor(
    private messageService: MessageService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.getCategoryRequest().then((msg) => {
      this.getPropertiesByCategory(msg).then(() => {  });
    });
  }

  private async getPropertiesByCategory(category: string): Promise<any> {
    const response = await this.categoriesService.getPropertiesByCategory(category);
    if (response.success) {
      response.data.map((property) => {
        this.properties.push(property);
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
}
