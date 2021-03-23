import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ISearch} from '../../../models/search';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RangePriceService} from '../../../services/range-price/range-price.service';
import {CitiesService} from '../../../services/city/cities.service';
import {CategoriesService} from '../../../services/category/categories.service';
import {MessageService} from '../../../services/message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  searchForm: FormGroup;
  rangeOfPrices = [];
  cities = [];
  categories = [];
  params: ISearch = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rangeOfPricesService: RangePriceService,
    private citiesService: CitiesService,
    private categoriesService: CategoriesService,
    private messageService: MessageService
  ) {
    this.searchForm = this.fb.group({
      reference: [''],
      price: [''],
      location: [''],
      category: ['']
    });
  }

  ngOnInit(): void {
    this.getRangeOfPrices()
      .then(p => {
        this.getCities()
          .then(c => {
          this.getCategories()
            .then(t => {
            this.setDefaultValues();
          });
        });
      });
  }

  onSubmit(): void {
    if (this.validateFormAndSetValues()) {
      this.sendParams();
      this.router.navigate(['results']);
    }
  }

  private async getRangeOfPrices(): Promise<any> {
    const prices = await this.rangeOfPricesService.getRangeOfPrices();
    this.rangeOfPrices = prices.data;
  }

  private async getCities(): Promise<any> {
    const cities = await this.citiesService.getAllCities();
    this.cities = cities.data;
  }

  private async getCategories(): Promise<any> {
    const categories = await this.categoriesService.getAllCategories();
    this.categories = categories.data;
  }

  private setDefaultValues(): void {
    this.searchForm.patchValue({price: this.rangeOfPrices, location: this.cities });
  }

  private validateFormAndSetValues(): boolean {
    let navigate = false;

    Object.keys(this.searchForm.controls).forEach(key => {
      if (this.searchForm.get(key).touched) {
        this.params[key] = this.searchForm.get(key).value;
        navigate = true;
      } else {
        this.params[key] = '';
      }
    });
    return navigate;
  }

  sendParams(): void {
    this.messageService.changeMessage(this.params);
  }

}
