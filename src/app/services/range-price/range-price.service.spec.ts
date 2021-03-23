import { TestBed } from '@angular/core/testing';

import { RangePriceService } from './range-price.service';

describe('RangePriceService', () => {
  let service: RangePriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RangePriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
