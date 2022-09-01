import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bus } from '../bus';
import { BusService } from '../service/bus.service';

@Component({
  selector: 'app-searched-bus-list',
  templateUrl: './searched-bus-list.component.html',
  styleUrls: ['./searched-bus-list.component.css'],
})
export class SearchedBusListComponent implements OnInit {
  source: string = '';
  destination: string = '';
  dateOfJourney!: string;
  dateValue: any;
  busList: Bus[] = [];
  selectedBusId!: number;
  userId!: Number;
  // for seats (next page ki)
  bookedSeats: string[] = [];

  constructor(
    private busService: BusService,
    private router: Router,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    // search -> 3 store
    this.source = String(sessionStorage.getItem('source'));
    this.destination = String(sessionStorage.getItem('destination'));
    this.userId = Number(sessionStorage.getItem('userId'));

    // 2 step process for date conversion
    this.dateValue = sessionStorage.getItem('dateOfJourney');
    this.dateOfJourney = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd')!;

    // service returns an output
    // this return can be caught by subscribe
    // subscribe(function) , function parameter <- service

    this.busService
      .searchBusList(this.source, this.destination)
      .subscribe((fetchedBusList) => {
        fetchedBusList.forEach((val) => {
          // coaches -> only for users
          if (!(this.userId == 0 && val.typeOfBus === 'Coach')) {
            this.busList.push(val);
          } else {
          }
        });
        console.log(this.busList);
      });
  }

  busSelect(busId: number) {
    this.selectedBusId = busId;
    sessionStorage.setItem('selectedBusId', this.selectedBusId.toString());

    // logic for seating arrangement
    this.busService
      .fetchBookedSeats(this.dateOfJourney, this.selectedBusId)
      .subscribe((fetchedSeatList) => {
        this.bookedSeats = fetchedSeatList;
        // storing the booked seats
        sessionStorage.setItem('seatList', JSON.stringify(this.bookedSeats));
      });

    this.router.navigate(['seatBookingLink']).then(() => {
      window.location.reload();
    });
  }
}
