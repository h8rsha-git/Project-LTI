import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.css'],
})
export class NewHomeComponent implements OnInit {
  // minimum date --> current date
  minDate!: Date;
  journeyDate!: Date;

  source!: string;
  destination!: string;
  dateOfJourney!: string;

  // temporary variables for Date comparision
  currentDate!: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.minDate = new Date();
    //console.log(sessionStorage.getItem('userId'));
  }

  checkBus(searchBusForm: NgForm) {
    // comparing dates
    this.currentDate = new Date().toJSON().slice(0, 10);

    //console.log(this.currentDate + ' ' + this.journeyDate);

    this.minDate = new Date(this.currentDate);
    this.journeyDate = new Date(this.dateOfJourney);

    if (this.source === this.destination) {
      document.getElementById('errorForDirectClick')!.innerHTML =
        'Source and Destination cannot be same or Empty';
    } else if (
      searchBusForm.valid &&
      this.minDate.getTime() <= this.journeyDate.getTime()
    ) {
      document.getElementById('errorForDirectClick')!.innerHTML = '';
      sessionStorage.setItem('source', this.source.toString());
      sessionStorage.setItem('destination', this.destination.toString());
      //console.log(typeof this.dateOfJourney);
      sessionStorage.setItem('dateOfJourney', this.journeyDate.toString());
      this.router.navigate(['searchBus']);
    } else {
      //console.log('Enter valid info');
      document.getElementById('errorForDirectClick')!.innerHTML =
        'Enter valid infomation';
    }
  }
}
