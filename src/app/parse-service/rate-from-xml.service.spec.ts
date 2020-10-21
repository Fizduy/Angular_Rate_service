import { TestBed } from '@angular/core/testing';

import { RateFromXMLService } from './rate-from-xml.service';

describe('RateFromXMLService', () => {
  let service: RateFromXMLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateFromXMLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
