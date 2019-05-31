import { TestBed } from '@angular/core/testing';

import { PnmService } from './pnm.service';

describe('PnmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PnmService = TestBed.get(PnmService);
    expect(service).toBeTruthy();
  });
});
