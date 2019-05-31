import { TestBed } from '@angular/core/testing';

import { BookingDataResolveServiceService } from './booking-data-resolve-service.service';

describe('BookingDataResolveServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookingDataResolveServiceService = TestBed.get(BookingDataResolveServiceService);
    expect(service).toBeTruthy();
  });
});
