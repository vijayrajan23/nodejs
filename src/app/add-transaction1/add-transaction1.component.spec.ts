import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransaction1Component } from './add-transaction1.component';

describe('AddTransaction1Component', () => {
  let component: AddTransaction1Component;
  let fixture: ComponentFixture<AddTransaction1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransaction1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransaction1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
