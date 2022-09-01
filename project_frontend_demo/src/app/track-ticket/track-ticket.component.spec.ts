import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackTicketComponent } from './track-ticket.component';

describe('TrackTicketComponent', () => {
  let component: TrackTicketComponent;
  let fixture: ComponentFixture<TrackTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
