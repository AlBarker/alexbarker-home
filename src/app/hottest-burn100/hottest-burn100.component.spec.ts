import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HottestBurn100Component } from './hottest-burn100.component';

describe('HottestBurn100Component', () => {
  let component: HottestBurn100Component;
  let fixture: ComponentFixture<HottestBurn100Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HottestBurn100Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HottestBurn100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
