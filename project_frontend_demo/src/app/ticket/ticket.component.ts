import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import { UserService } from '../service/user.service';
import { Passenger } from '../passenger';
import { BusService } from '../service/bus.service';
import { Bus } from '../bus';
import { Ticket } from '../ticket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  ticketId!: number;
  rescheduleTicketId!: number;
  ticket!: Ticket;
  details: any;
  passengerList!: Passenger[];
  bus!: Bus;
  cTicketId!: number;
  isclicked!: boolean;
  dateOfReschedule!: Date;
  isLoggedIn!: boolean;
  minDate = new Date();
  dateOfJourney!: string;
  isCancelled!: boolean;
  passengerEmail: string;

  constructor(
    private service: UserService,
    private busService: BusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ticketId = Number(sessionStorage.getItem('ticketId'));
    this.passengerEmail = sessionStorage.getItem('emailOfPassenger')!;
    this.rescheduleTicketId = Number(sessionStorage.getItem('ticketId'));
    console.log(this.rescheduleTicketId);
    sessionStorage.setItem(
      'rescheduleTicketId',
      this.rescheduleTicketId.toString()
    );
    this.service.ticketDetails(this.ticketId).subscribe((fetchedTicket) => {
      this.ticket = fetchedTicket;
      console.log(this.ticket);
    });

    this.service
      .passengerList(this.ticketId)
      .subscribe((fetchedPassengerList) => {
        this.passengerList = fetchedPassengerList;
        console.log(this.passengerList);
      });

    this.busService.getBusByticketId(this.ticketId).subscribe((fetchedBus) => {
      this.bus = fetchedBus;
      console.log(this.bus);
    });
  }

  /***************************************************** */

  public captureScreen() {
    var data = document.getElementById('printThisTicket');
    html2canvas(data!, { scrollY: -window.scrollY, scale: 1 }).then(
      (canvas) => {
        // Few necessary setting options
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('Ticket.pdf'); // Generated PDF
      }
    );
  }

  cancelTicketId(ticketId: number) {
    this.cTicketId = ticketId;
    sessionStorage.setItem('cancelTicketId', this.cTicketId.toString());
  }

  cancelfn() {
    var modal = document.getElementById('myModal')!;
    var btn3 = document.getElementById('myBtn');

    modal.style.display = 'block';
    var span: HTMLElement;
    span = <HTMLElement>document.getElementsByClassName('close')[0];
    span.onclick = function () {
      modal.style.display = 'none';
    };

    if (sessionStorage.getItem('userId') !== null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  cancelFunction() {
    this.isclicked = true;
    this.service
      .cancelTicket(this.ticketId, this.passengerEmail)
      .subscribe((result) => {
        if (result) {
          document.getElementById('resultDiv')!.innerHTML =
            'Your ticket has been cancelled.Redirecting to User Dashboard.....';
          setTimeout(() => {
            this.router.navigate(['userDashBoard']);
          }, 4000);
        } else {
          document.getElementById('resultDiv')!.innerHTML =
            'Your ticket could not be cancelled.Redirecting to User Dashboard.....';
          setTimeout(() => {
            this.router.navigate(['userDashBoard']);
          }, 4000);
        }
      });
  }

  close() {
    var modal = document.getElementById('myModal')!;
    modal.style.display = 'none';
  }

  reschedule() {
    var modal = document.getElementById('myModal1')!;
    modal.style.display = 'block';
    var span: HTMLElement;
    span = <HTMLElement>document.getElementsByClassName('close')[1];
    span.onclick = function () {
      modal.style.display = 'none';
    };
  }
  changeSeats() {
    document.getElementById('date');
    sessionStorage.setItem('dateOfJourney', this.dateOfReschedule.toString());
    sessionStorage.setItem('selectedBusId', this.bus.busId.toString());
    this.router.navigate(['rescheduleSeat']).then(() => {
      window.location.reload();
    });
  }
}
