import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadmusUserComponent } from './radmus-user.component';

describe('RadmusUserComponent', () => {
  let component: RadmusUserComponent;
  let fixture: ComponentFixture<RadmusUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadmusUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadmusUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
