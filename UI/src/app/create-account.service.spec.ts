import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { CreateAccountService } from './create-account.service';

describe('CreateAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateAccountService,  { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } }],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([CreateAccountService], (service: CreateAccountService) => {
    expect(service).toBeTruthy();
  }));
});
