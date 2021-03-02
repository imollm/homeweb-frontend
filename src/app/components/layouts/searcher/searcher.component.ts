import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchI} from '../../../models/search';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  @Output() search: EventEmitter<SearchI>;

  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      reference: [''],
      price: [''],
      location: [''],
      category: ['']
    });
    this.search = new EventEmitter<SearchI>();
  }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.search.emit();
  }

}
