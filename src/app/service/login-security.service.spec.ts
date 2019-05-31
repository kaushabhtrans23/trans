import { TestBed, inject } from '@angular/core/testing';

import { LoginSecurityService } from './login-security.service';

describe('LoginSecurityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginSecurityService]
    });
  });

  it('should be created', inject([LoginSecurityService], (service: LoginSecurityService) => {
    expect(service).toBeTruthy();
  }));
});
