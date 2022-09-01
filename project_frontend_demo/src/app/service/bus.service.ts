import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../bus';

import { BookaTicketDto } from '../model/booka-ticket-dto';
import { Ticket } from '../model/ticket';
import { Passenger } from '../passenger';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  //ROOT_URL:String="http://obsbus-env.eba-39b63ghj.us-east-1.elasticbeanstalk.com";

  ROOT_URL: String = 'http://localhost:9090';

  constructor(private httpClient: HttpClient) {}

  searchBusList(source: string, destination: string): Observable<Bus[]> {
    console.log(
      this.ROOT_URL + `/searchbus?source=${source}&destination=${destination}`
    );
    return this.httpClient.get<Bus[]>(
      this.ROOT_URL + `/searchbus?source=${source}&destination=${destination}`
    );
  }

  fetchBookedSeats(dateOfJourney: string, busId: number): Observable<string[]> {
    return this.httpClient.get<string[]>(
      this.ROOT_URL +
        '/fetchbookedseats?travelDate=' +
        dateOfJourney +
        '&busId=' +
        busId
    );
  }

  getBusById(busId: number): Observable<Bus> {
    return this.httpClient.get<Bus>(
      this.ROOT_URL + '/getbusbyid?busId=' + busId
    );
  }

  bookATicket(
    bookATicket: BookaTicketDto,
    userId: number,
    busId: number
  ): Observable<Ticket> {
    return this.httpClient.post<Ticket>(
      this.ROOT_URL + '/bookaticket?userId=' + userId + '&busId=' + busId,
      bookATicket
    );
  }

  getBusByticketId(ticketId: number): Observable<Bus> {
    return this.httpClient.get<Bus>(
      this.ROOT_URL + '/getBusByTicketId?ticketId=' + ticketId
    );
  }
}
