import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptUploadComponent } from './receipt-upload.component';

describe('ReceiptUploadComponent', () => {
  let component: ReceiptUploadComponent;
  let fixture: ComponentFixture<ReceiptUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
