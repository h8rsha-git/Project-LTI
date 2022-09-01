import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-track-ticket',
  templateUrl: './track-ticket.component.html',
  styleUrls: ['./track-ticket.component.css'],
})
export class TrackTicketComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}
  ticketId!: number;
  email!: string;
  ngOnInit(): void {}

  trackTicket() {
    this.userService.ticketDetails(this.ticketId).subscribe((ticket) => {
      console.log(ticket.status);
      if (ticket.status.toString() == 'CANCELLED') {
        alert('Ticket does not exist..');
      } else {
        sessionStorage.setItem('ticketId', this.ticketId.toString());
        this.router.navigate(['ticketLink']);
      }
    });
  }
}
