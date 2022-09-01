import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../user';

@Component({
  selector: 'app-cancel-reschedule-ticket',
  templateUrl: './cancel-reschedule-ticket.component.html',
  styleUrls: ['./cancel-reschedule-ticket.component.css'],
})
export class CancelRescheduleTicketComponent implements OnInit {
  constructor(private service: UserService) {}

  isLoggedIn!: boolean;
  cancelTicketId!: number;
  userId: number;
  user: User;
  userEmail: string;

  ngOnInit(): void {
    // session storage -> memory of web browser (5MB)
    this.cancelTicketId = Number(sessionStorage.getItem('cancelTicketId'));
    if (sessionStorage.getItem('userId') !== null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
      console.log('User not logged in');
    }
  }

  // ticket -> email -> refund.
  //check out those the functions
  cancelFunction2() {
    this.userId = Number(sessionStorage.getItem('userId'));
    this.service.getUserByUserId(this.userId).subscribe((user2) => {
      this.user = user2;
    });
    console.log(this.user);
    this.userEmail = this.user.email;

    this.service
      .cancelTicket(this.cancelTicketId, this.userEmail)
      .subscribe((result) => {
        console.log(result);
        document.getElementById('resultDiv')!.innerHTML =
          'Your ticket has been cancelled';
      });
  }
}
