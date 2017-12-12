import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { G28FormComponent } from './g28-form.component';

describe('G28FormComponent', () => {
  let component: G28FormComponent;
  let fixture: ComponentFixture<G28FormComponent>;

  beforeEach(async(() => {

    class RouterStub {
      // navigate(url: string) { return url; }
    }

    TestBed.configureTestingModule({
      declarations: [ G28FormComponent ],
      providers: [  { provide: Router, useValue: RouterStub } ]
    });

    fixture = TestBed.createComponent(G28FormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  // it('should create the dmn thing', async(() => {
  //  expect(component).toBeTruthy();
  // }));
});
