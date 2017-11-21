import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { G28FormComponent } from './g28-form.component';

describe('G28FormComponent', () => {
  let component: G28FormComponent;
  let fixture: ComponentFixture<G28FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ G28FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(G28FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
