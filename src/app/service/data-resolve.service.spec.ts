import { TestBed, inject } from '@angular/core/testing';

import { DataResolveService } from './data-resolve.service';

describe('DataResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataResolveService]
    });
  });

  it('should be created', inject([DataResolveService], (service: DataResolveService) => {
    expect(service).toBeTruthy();
  }));
});
