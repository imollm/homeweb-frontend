import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchI} from '../../../models/search';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ApiResponseI} from '../../../models/api-response';
import {EndPointMapper} from '../../../api/end-point-mapper';
import {end} from '@popperjs/core';
import {RangePriceService} from '../../../services/range-price/range-price.service';
import {CitiesService} from '../../../services/city/cities.service';
import {CategoriesService} from '../../../services/category/categories.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  @Output() searchParams = new EventEmitter<SearchI>();

  searchForm: FormGroup;
  rangeOfPrices = [];
  cities = [];
  categories = [];
  params: SearchI;

  constructor(
    private fb: FormBuilder,
    private rangeOfPricesService: RangePriceService,
    private citiesService: CitiesService,
    private categoriesService: CategoriesService
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
    this.validateFormAndSetValues();
  }

  async getRangeOfPrices(): Promise<any> {
    const prices = await this.rangeOfPricesService.getRangeOfPrices();
    this.rangeOfPrices = prices.data;
  }

  async getCities(): Promise<any> {
    const cities = await this.citiesService.getAllCities();
    this.cities = cities.data;
  }

  async getCategories(): Promise<any> {
    const categories = await this.categoriesService.getAllCategories();
    this.categories = categories.data;
  }

  setDefaultValues(): void {
    this.searchForm.patchValue({price: this.rangeOfPrices, location: this.cities });
  }

  validateFormAndSetValues(): void {
    const reference = this.searchForm.controls.reference;
    const price = this.searchForm.controls.price;
    const location = this.searchForm.controls.location;
    const category = this.searchForm.controls.category;

    if (reference.touched || price.touched || location.touched || category.touched) {
      this.params.reference = reference.value;
      this.params.price = price.value;
      this.params.location = location.value;
      this.params.category = category.value;

      this.searchParams.emit(this.params);
    }
  }

}
