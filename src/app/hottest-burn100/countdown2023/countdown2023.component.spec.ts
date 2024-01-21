import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Countdown2023Component } from './countdown2023.component';

describe('Countdown2023Component', () => {
  let component: Countdown2023Component;
  let fixture: ComponentFixture<Countdown2023Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Countdown2023Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Countdown2023Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
