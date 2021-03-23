import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchI} from '../../../models/search';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ApiResponseI} from '../../../models/api-response';
import {EndPointMapper} from '../../../api/end-point-mapper';
import {end} from '@popperjs/core';
import {RangePriceService} from '../../../services/range-price/range-price.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  @Output() search = new EventEmitter<SearchI>();

  searchForm: FormGroup;
  rangeOfPrices = [];

  constructor(
    private fb: FormBuilder,
    private rangeOfPricesService: RangePriceService
  ) {
    this.searchForm = this.fb.group({
      reference: [''],
      price: [''],
      location: [''],
      category: ['']
    });
  }

  ngOnInit(): void {
    this.getRangeOfPrices().then(r => {console.log(this.rangeOfPrices); });
  }

  onSearch(): void {
    this.search.emit();
  }

  async getRangeOfPrices(): Promise<void> {
    this.rangeOfPrices = await this.rangeOfPricesService.getRangeOfPrices();
  }

  setDefaultValues(): void {
    this.searchForm.patchValue({price: this.rangeOfPrices});
  }

}
