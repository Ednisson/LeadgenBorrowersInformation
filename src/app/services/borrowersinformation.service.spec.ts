import { TestBed } from '@angular/core/testing';

import { BorrowersinformationService } from './borrowersinformation.service';

describe('BorrowersinformationService', () => {
  let service: BorrowersinformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowersinformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
