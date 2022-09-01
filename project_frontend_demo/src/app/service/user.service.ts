import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../user';
import { LoginDto } from '../model/login-dto';
import { Ticket } from '../ticket';
import { Passenger } from '../passenger';
import { ChangePasswordDto } from '../model/change-password-dto';
import { LoginForgetDto } from '../model/login-forget-dto';
import { Feedback } from '../feedback';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  // registerUser(user:User):Observable<User>{
  //   return this.httpClient.post<User>("http://localhost:9090/registerorupdateuser",user);

  //   // registerUser(user:User):Observable<User>{
  //   //   return this.httpClient.post<User>("http://localhost:9090/UserRestApp/rest/registeruser",user);

  //   // }
  // }

  // ROOT_URL: String = "http://obsbus-env.eba-39b63ghj.us-east-1.elasticbeanstalk.com";
  ROOT_URL: String = 'http://localhost:9090';

  checkMailExists(mail: string): Observable<Boolean> {
    return this.httpClient.get<Boolean>(
      this.ROOT_URL + '/mailexists?mail=' + mail
    );
  }

  userFeedback(feedback: Feedback): Observable<Feedback> {
    return this.httpClient.post<Feedback>(
      this.ROOT_URL + '/userfeedback',
      feedback
    );
  }

  registerUser(user: User): Observable<User> {
    let url = this.ROOT_URL + '/registerorupdateuser';
    return this.httpClient.post<User>(url, user);
  }

  getIdByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(
      this.ROOT_URL + '/usermail?email=' + email
    );
  }

  loginUser(loginDto: LoginDto): Observable<boolean> {
    return this.httpClient.post<boolean>(this.ROOT_URL + '/login', loginDto);
  }

  ticketDetails(ticketId: number): Observable<Ticket> {
    return this.httpClient.get<Ticket>(
      this.ROOT_URL + '/ticketDetails?ticketId=' + ticketId
    );
  }

  passengerList(ticketId: number): Observable<Passenger[]> {
    return this.httpClient.get<Passenger[]>(
      this.ROOT_URL + '/getPassengerList?ticketId=' + ticketId
    );
  }

  getUserByUserId(userId: number): Observable<User> {
    return this.httpClient.get<User>(
      this.ROOT_URL + '/finduserbyid?userId=' + userId
    );
  }

  getTicketsBookedByUserId(userId: number): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(
      this.ROOT_URL + '/viewticketbookedbyuserid?userId=' + userId
    );
  }

  rechargeWallet(userId: number, rechargeAmount: number): Observable<User> {
    return this.httpClient.get<User>(
      this.ROOT_URL +
        '/rechargeWallet?userId=' +
        userId +
        '&rechargeAmount=' +
        rechargeAmount
    );
  }

  changePassword(changePasswordDto: ChangePasswordDto): Observable<boolean> {
    return this.httpClient.put<boolean>(
      this.ROOT_URL + '/changepassword',
      changePasswordDto
    );
  }

  cancelTicket(ticketId: number, mail: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      this.ROOT_URL + '/cancelticket?ticketId=' + ticketId + '&mailId=' + mail
    );
  }

  payByWallet(userId: number, fare: number): Observable<boolean> {
    return this.httpClient.get<boolean>(
      this.ROOT_URL + '/paythroughwallet?userId=' + userId + '&amount=' + fare
    );
  }

  sendEmail(ticketId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(
      this.ROOT_URL + '/sendEmail?ticketId=' + ticketId
    );
  }

  reset(loginforgetdto: LoginForgetDto): Observable<User> {
    return this.httpClient.post<User>(
      this.ROOT_URL + '/loginforgetpassword',
      loginforgetdto
    );
  }

  reschedule(
    ticketId: number,
    travelDate: string,
    seats: String[]
  ): Observable<Ticket> {
    return this.httpClient.put<Ticket>(
      this.ROOT_URL +
        '/reschedule?ticketId=' +
        ticketId +
        '&travelDate=' +
        travelDate,
      seats
    );
  }

  addTicketToUser(ticketId: number, userId: number): Observable<Ticket> {
    return this.httpClient.get<Ticket>(
      this.ROOT_URL +
        '/addtickettouser?ticketId=' +
        ticketId +
        '&userId=' +
        userId
    );
  }

  sendMailOnRegistration(userId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(
      this.ROOT_URL + '/sendmailonregistration?userId=' + userId
    );
  }
}
