import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { ChangePasswordDto } from '../model/change-password-dto';
import { User } from '../model/user';
import { Password } from '../password';
import { UserService } from '../service/user.service';
import { Status } from '../status';
import { Ticket } from '../ticket';
import { Wallet } from '../wallet';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  minDate = new Date();
  today = new Date().toLocaleDateString();
  dateOfJourney = this.datepipe.transform(this.today, 'yyyy-MM-dd');
  password: Password = new Password();
  wallet: Wallet = new Wallet();
  bookingDetails!: Ticket[];
  date = '1995-12-17';
  isStatusD!: boolean;
  tId!: number;
  isEditable: boolean = false;
  loggedInUserId!: number;
  loggedInUser: User = new User();
  status: Status = Status.BOOKED;
  tickets!: Ticket[];
  changePasswordDto: ChangePasswordDto = new ChangePasswordDto();
  isBooked!: boolean;
  isStatus: boolean = true;
  cancelTicketId!: number;
  isShown: boolean = true;
  isclicked!: boolean;
  isCancelled!: boolean;
  isDisabled!: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loggedInUserId = Number(sessionStorage.getItem('userId'));
    if (this.loggedInUserId === 0) {
      this.router.navigate(['loginLink']);
    }

    console.log(this.loggedInUserId + ' of current user');
    this.userService
      .getUserByUserId(this.loggedInUserId)
      .subscribe((fetchedUser) => {
        this.loggedInUser = fetchedUser;
        console.log(this.loggedInUser);
      });

    this.userService
      .getTicketsBookedByUserId(this.loggedInUserId)
      .subscribe((fetchedTickets) => {
        this.tickets = fetchedTickets;
        localStorage.setItem('tickets', JSON.stringify(this.tickets));
      });

    this.tickets = JSON.parse(localStorage.getItem('tickets')!);
    console.log(this.tickets);

    for (let i = 0; i < this.tickets.length; i++) {
      const ticketDate = new Date(this.tickets[i].travelDate.toString());
      const todayDate = new Date(this.today);
      this.isDisabled = ticketDate < todayDate;
      console.log(this.isDisabled);
    }

    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      var curr: HTMLElement;
      curr = <HTMLElement>tabcontent[i];
      curr.style.display = 'none';
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    // Show the bookinh tab, and add an "active" class to the link that opened the tab
    document.getElementById('Profile')!.style.display = 'block';
  }

  updateUserInfo() {
    this.isEditable = !this.isEditable;
    if (this.isEditable) {
      document.getElementById('editUpdateBtn')!.innerText = 'Update';
    } else {
      document.getElementById('editUpdateBtn')!.innerText = 'Edit';
    }

    if (!this.isEditable) {
      this.userService
        .registerUser(this.loggedInUser)
        .subscribe((fetchedUser) => {
          this.loggedInUser = fetchedUser;
          console.log(this.loggedInUser);
        });
      document.getElementById('msg')!.innerHTML = 'Information Updated';
    }
  }

  rechargeWallet(rechargeForm: NgForm) {
    if (rechargeForm.valid) {
      this.userService
        .rechargeWallet(this.loggedInUserId, this.wallet.amount)
        .subscribe((fetchedUser) => {
          this.loggedInUser = fetchedUser;
          console.log(this.loggedInUser);
        });
      document.getElementById('msgWallet')!.innerHTML = 'Wallet Updated';
    } else {
      document.getElementById('msgWallet')!.innerHTML = 'Enter Valid Data';
    }
  }

  checkPassword(passwordForm: NgForm) {
    if (this.password.newPassword != this.password.confirmPassword) {
      document.getElementById('changePassword')!.innerHTML =
        'Confirm Password is not matching';
    } else if (passwordForm.valid) {
      document.getElementById('changePassword')!.innerHTML = '';
      console.log(this.password); //obj will be sent to server thru Api calls
      this.changePasswordDto.userId = this.loggedInUserId;
      this.changePasswordDto.password = this.password.confirmPassword;
      console.log(this.changePasswordDto);

      this.userService
        .changePassword(this.changePasswordDto)
        .subscribe((fetchedString) => {
          if (fetchedString) {
            document.getElementById('resultDiv')!.innerHTML =
              'Password Changed Successfully';
          } else {
            document.getElementById('resultDiv')!.innerHTML =
              'Could not change the password';
          }
        });
    } else {
      alert('Please enter correct information.');
    }
  }

  openTab(evt: Event, name: string, btnClass: string) {
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      var curr: HTMLElement;
      curr = <HTMLElement>tabcontent[i];
      curr.style.display = 'none';
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace('active', '');
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(name)!.style.display = 'block';

    //add class to button
    document.getElementById(btnClass)!.classList.add('active');
  }

  signOut() {
    sessionStorage.clear();
    this.isStatus = false;
    this.router.navigate(['homeLink']).then(() => {
      window.location.reload();
    });
  }

  trackFunction(ticketId: number) {
    this.tId = ticketId;
    sessionStorage.setItem('ticketId', this.tId.toString());
    console.log(100);
  }

  // cancelFunction() {
  //   this.cancelTicketId = Number(sessionStorage.getItem("ticketId"));
  //   this.isclicked = true;

  //   this.userService.cancelTicket(this.cancelTicketId).subscribe(
  //     result => {
  //       console.log(result);
  //       document.getElementById("res")!.innerHTML = "Your ticket has been cancelled";
  //     }
  //   );
  // }
  close() {
    var modal = document.getElementById('myModal')!;
    modal.style.display = 'none';
  }
}
