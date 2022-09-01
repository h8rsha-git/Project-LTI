import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelRescheduleTicketComponent } from './cancel-reschedule-ticket.component';

describe('CancelRescheduleTicketComponent', () => {
  let component: CancelRescheduleTicketComponent;
  let fixture: ComponentFixture<CancelRescheduleTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelRescheduleTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelRescheduleTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
