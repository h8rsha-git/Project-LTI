import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CancelRescheduleTicketComponent } from './cancel-reschedule-ticket/cancel-reschedule-ticket.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NewHomeComponent } from './new-home/new-home.component';
import { PassengerDetailsComponent } from './passenger-details/passenger-details.component';
import { PaymentComponent } from './payment/payment.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { RescheduleSeatBookingComponent } from './reschedule-seat-booking/reschedule-seat-booking.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SearchedBusListComponent } from './searched-bus-list/searched-bus-list.component';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { TicketComponent } from './ticket/ticket.component';
import { TrackTicketComponent } from './track-ticket/track-ticket.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
const routes: Routes = [
  { path: '', component: NewHomeComponent },
  { path: 'loginLink', component: LoginComponent },
  { path: 'homeLink', component: NewHomeComponent },
  { path: 'trackticket', component: TrackTicketComponent },
  { path: 'feedbackLink', component: FeedbackComponent },
  { path: 'aboutUsLink', component: AboutComponent },
  { path: 'searchBus', component: SearchedBusListComponent },
  { path: 'seatBookingLink', component: SeatBookingComponent },
  { path: 'passengerDetailsLink', component: PassengerDetailsComponent },
  { path: 'paymentLink', component: PaymentComponent },
  { path: 'ticketLink', component: TicketComponent },
  { path: 'registerationLink', component: RegisterationComponent },
  { path: 'userDashBoard', component: UserDashboardComponent },
  { path: 'forgotPasswordLink', component: ForgotPasswordComponent },
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'adminDashBoardLink', component: AdminComponentComponent },
  { path: 'contactUsLink', component: ContactUsComponent },
  { path: 'cancelLink', component: CancelRescheduleTicketComponent },
  { path: 'forgotLink', component: ResetpasswordComponent },
  { path: 'rescheduleSeat', component: RescheduleSeatBookingComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
