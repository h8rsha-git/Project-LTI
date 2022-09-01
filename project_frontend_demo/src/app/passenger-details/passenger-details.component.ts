import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Passenger } from '../passenger';
import { UserService } from '../service/user.service';
import { User } from '../user';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css'],
})
export class PassengerDetailsComponent implements OnInit {
  emailOfPassenger!: string;
  allPassengerList: Passenger[] = [];
  fetchedSeatInfo!: string | any[];
  userId: number;

  passengerDetail: Passenger = new Passenger();
  numberOfPassengers!: number;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchedSeatInfo = JSON.parse(
      sessionStorage.getItem('seatsOfPassengers')!
    );
    this.numberOfPassengers = this.fetchedSeatInfo.length;
    this.userId = Number(sessionStorage.getItem('userId'));
    // displays seat numbers
    // for (let i = 0; i < this.numberOfPassengers; i++) {
    //   console.log(this.fetchedSeatInfo[i]);
    // }
    if (this.userId !== 0) {
      this.userService.getUserByUserId(this.userId).subscribe((user: User) => {
        this.emailOfPassenger = user.email;
      });
    }
  }

  addPassenger() {
    if (
      this.passengerDetail.passengerName == null ||
      this.passengerDetail.passengerAge == null ||
      this.passengerDetail.gender == null
    ) {
      document.getElementById('msgpassenger')!.innerHTML =
        'Please fill all the information.';
    } else {
      document.getElementById('msgpassenger')!.innerHTML = '';
      var pass: Passenger = {
        passengerId: NaN,
        passengerName: this.passengerDetail.passengerName,
        passengerAge: this.passengerDetail.passengerAge,
        gender: this.passengerDetail.gender,
        seatNo: this.fetchedSeatInfo[this.numberOfPassengers - 1],
      };

      this.allPassengerList.push(pass);

      for (let i = 0; i < this.allPassengerList.length; i++) {
        console.log(this.allPassengerList[i]);
      }
      this.numberOfPassengers--;
    }
  }

  proceedToPay(contactForm: NgForm) {
    if (contactForm.valid && this.numberOfPassengers <= 0) {
      sessionStorage.setItem('emailOfPassenger', this.emailOfPassenger);
      // storing passenger objects
      sessionStorage.setItem(
        'listOfPassenger',
        JSON.stringify(this.allPassengerList)
      );
      this.router.navigate(['paymentLink']);
    } else {
      alert('Please enter correct information.');
    }
  }
}
