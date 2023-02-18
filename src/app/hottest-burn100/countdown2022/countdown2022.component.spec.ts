import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Countdown2022Component } from './countdown2022.component';

describe('Countdown2022Component', () => {
  let component: Countdown2022Component;
  let fixture: ComponentFixture<Countdown2022Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Countdown2022Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Countdown2022Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
