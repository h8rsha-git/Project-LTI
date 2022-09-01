import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleSeatBookingComponent } from './reschedule-seat-booking.component';

describe('RescheduleSeatBookingComponent', () => {
  let component: RescheduleSeatBookingComponent;
  let fixture: ComponentFixture<RescheduleSeatBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RescheduleSeatBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RescheduleSeatBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
