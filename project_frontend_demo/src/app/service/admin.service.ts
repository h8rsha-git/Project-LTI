import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '../user';
import { LoginDto } from '../model/login-dto';
import { Bus } from '../bus';
import { Ticket } from '../model/ticket';
import { LoginForgetDto } from '../model/login-forget-dto';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  //ROOT_URL:String="http://obsbus-env.eba-39b63ghj.us-east-1.elasticbeanstalk.com";
  ROOT_URL: String = 'http://localhost:9090';

  constructor(private httpClient: HttpClient) {}

  createAdmin(loginDto: LoginDto) {
    return this.httpClient.post(this.ROOT_URL + '/createadmin', loginDto);
  }

  loginAdmin(loginDto: LoginDto): Observable<boolean> {
    return this.httpClient.post<boolean>(
      this.ROOT_URL + '/loginadmin',
      loginDto
    );
  }

  viewAllBuses(): Observable<Bus[]> {
    return this.httpClient.get<Bus[]>(this.ROOT_URL + '/viewallbuses');
  }

  addBus(bus: Bus): Observable<Bus> {
    return this.httpClient.post<Bus>(this.ROOT_URL + '/addbus', bus);
  }

  deleteBus(id: number) {
    return this.httpClient.delete(this.ROOT_URL + `/deletebus?busId=` + id);
  }

  viewRegisterCustomer(): Observable<User[]> {
    return this.httpClient.get<User[]>(
      this.ROOT_URL + '/viewallregsiteredcustomers'
    );
  }

  viewRegisterCustomerWithNoBooking(): Observable<User[]> {
    return this.httpClient.get<User[]>(
      this.ROOT_URL + '/viewcustomerwhoregisteredbutwithnobooking'
    );
  }

  mostPerfferedBus(): Observable<number[]> {
    return this.httpClient.get<number[]>(this.ROOT_URL + '/mostpreferredbus');
  }

  mostFrequentRoutes(): Observable<number[]> {
    return this.httpClient.get<number[]>(
      this.ROOT_URL + '/frequentlytravelledroute'
    );
  }

  getProfits(): Observable<number[]> {
    return this.httpClient.get<number[]>(this.ROOT_URL + '/getprofits');
  }

  updateBus(
    busId: number,
    source: string,
    destination: string,
    fare: number
  ): Observable<number> {
    return this.httpClient.get<number>(
      this.ROOT_URL +
        '/updatebus?busId=' +
        busId +
        '&source=' +
        source +
        '&destination=' +
        destination +
        '&fare=' +
        fare
    );
  }

  getTicketBasedOnBusAndDate(
    busId: number,
    travelDate: Date
  ): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(
      this.ROOT_URL +
        '/bookingsbasedonperiod?busId=' +
        busId +
        '&travelDate=' +
        travelDate
    );
  }
}
