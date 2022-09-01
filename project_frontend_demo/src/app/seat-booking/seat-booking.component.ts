import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Bus } from '../bus';
import { DatePipe } from '@angular/common';
import { BusService } from '../service/bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css'],
})
// At this point of time we have:
// source, destination, dateOfJourney, busId
export class SeatBookingComponent implements OnInit {
  bookedSeats: string[] = [];
  selectedSeatCount: number = 0;
  isSeatSelected: boolean = true;
  selectedSeatsList: Set<string> = new Set();

  totalAmount: number = 0;
  dateValue: any;
  dateOfJourney!: string;
  busId!: number;
  selectedBus!: Bus;

  constructor(
    private busService: BusService,
    public datepipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    // get the basic info from the session storage
    this.busId = Number(sessionStorage.getItem('selectedBusId'));
    this.dateValue = sessionStorage.getItem('dateOfJourney');
    this.dateOfJourney = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd')!;

    // getting the seat list (seatList updated in the bus-list component -> when bus is selected)
    this.bookedSeats = JSON.parse(sessionStorage.getItem('seatList')!);

    // logic for blocking the booked seats
    if (this.bookedSeats !== null) {
      //
      this.bookedSeats.map((element) => {
        const bookedSeat1 = document.getElementById(element)!;
        //console.log('Toggling Happenning ....');
        bookedSeat1.classList.add('occupied');
      });
    }

    // this code is to get bus information by bus id
    // due to early fetching of html page -> errors might appear in console -> IGNORE
    this.busService.getBusById(this.busId).subscribe((fetchedBus) => {
      //console.log(fetchedBus);
      this.selectedBus = fetchedBus;
    });
  }

  selectSeat(seat: string) {
    const selectedSeat = document.getElementById(seat)!;

    // double time tap logic
    if (selectedSeat.classList.contains('selected')) {
      selectedSeat.classList.remove('selected');
      this.selectedSeatCount--;
    }
    // Now it can be selected
    else {
      selectedSeat.classList.add('selected');
      this.selectedSeatCount++;
    }

    // Adding or deleting from the list
    if (selectedSeat.classList.contains('selected')) {
      this.selectedSeatsList.add(selectedSeat.id);
    } else {
      this.selectedSeatsList.delete(selectedSeat.id);
    }

    // calculating the cost
    this.totalAmount = this.selectedSeatsList.size * this.selectedBus.fare;
    //console.log(this.totalAmount);

    //this code is to disable button until and unless the seat is selected
    if (this.selectedSeatCount != 0) {
      this.isSeatSelected = false;
    } else {
      this.isSeatSelected = true;
    }
  }

  //selectSeatsList have the seats selected by the user
  //this function is to set passenger number and route to passenger page
  sendDataOfSeats() {
    const selectedSeatsArray = Array.from(this.selectedSeatsList);
    sessionStorage.setItem(
      'seatsOfPassengers',
      JSON.stringify(selectedSeatsArray)
    );
    sessionStorage.setItem('totalFare', this.totalAmount.toString());
    this.router.navigate(['passengerDetailsLink']);
  }
}
