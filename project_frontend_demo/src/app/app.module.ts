import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AboutComponent } from './about/about.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PaymentComponent } from './payment/payment.component';
import { TicketComponent } from './ticket/ticket.component';
import { FormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { CancelRescheduleTicketComponent } from './cancel-reschedule-ticket/cancel-reschedule-ticket.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import { SearchedBusListComponent } from './searched-bus-list/searched-bus-list.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { TrackTicketComponent } from './track-ticket/track-ticket.component';
import { PassengerDetailsComponent } from './passenger-details/passenger-details.component';
import { BookedTicketComponent } from './booked-ticket/booked-ticket.component';
import { NewHomeComponent } from './new-home/new-home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
//import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RescheduleSeatBookingComponent } from './reschedule-seat-booking/reschedule-seat-booking.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,

    AboutComponent,
    FeedbackComponent,
    PaymentComponent,
    TicketComponent,
    SeatBookingComponent,
    CancelRescheduleTicketComponent,
    AdminComponentComponent,
    SearchedBusListComponent,
    RegisterationComponent,
    ForgotPasswordComponent,
    LoginComponent,
    TrackTicketComponent,
    PassengerDetailsComponent,
    BookedTicketComponent,
    NewHomeComponent,
    ContactUsComponent,
    ResetpasswordComponent,
    RescheduleSeatBookingComponent,
    MyProfileComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPrintModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    // =======
    //     NgbModule,
    //     HttpClientModule,
    //     BrowserAnimationsModule,
    //     MatDatepickerModule,
    // >>>>>>> 5a6a58d6158a7cf02290a4f5d509d7f3019cb5fe
    //     MatNativeDateModule,
    //     MatFormFieldModule,
    //     MatInputModule
  ],

  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
