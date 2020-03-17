import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RamanComponent } from './raman.component';

describe('RamanComponent', () => {
  let component: RamanComponent;
  let fixture: ComponentFixture<RamanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RamanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RamanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
