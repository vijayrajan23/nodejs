import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTransactionComponent } from './add-new-transaction.component';

describe('AddNewTransactionComponent', () => {
  let component: AddNewTransactionComponent;
  let fixture: ComponentFixture<AddNewTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
