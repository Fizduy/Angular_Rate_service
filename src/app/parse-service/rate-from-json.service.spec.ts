import { TestBed } from '@angular/core/testing';

import { RateFromJsonService } from './rate-from-json.service';

describe('RateFromJsonService', () => {
  let service: RateFromJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateFromJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
