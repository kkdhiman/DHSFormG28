import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './user';
import { AuthenticateService } from './authenticate.service';

describe('AuthenticateService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticateService, { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } } ],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([AuthenticateService], (service: AuthenticateService) => {
    expect(service).toBeTruthy();
  }));

});
