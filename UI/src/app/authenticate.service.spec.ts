import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { User } from './user';
import { AuthenticateService } from './authenticate.service';

describe('AuthenticateService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticateService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([AuthenticateService], (service: AuthenticateService) => {
    expect(service).toBeTruthy();
  }));

});
