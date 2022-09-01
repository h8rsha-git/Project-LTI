import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from '../model/login-dto';
import { LoginForgetDto } from '../model/login-forget-dto';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private service: UserService, private router: Router) {}

  loginDto: LoginDto = new LoginDto();
  loginforgetdto: LoginForgetDto = new LoginForgetDto();
  user: User = new User();

  ngOnInit(): void {}

  resetPassword(forgotForm: NgForm): void {
    if (forgotForm.valid) {
      console.log(JSON.stringify(this.loginforgetdto));

      this.service.reset(this.loginforgetdto).subscribe((reset) => {
        console.log(reset);
        if (reset != null) {
          localStorage.setItem('Id', this.loginforgetdto.id.toString());
          console.log(Number(sessionStorage.getItem('Id')));
          localStorage.setItem('email', this.loginforgetdto.email.toString());
          document.getElementById('emaillink')!.innerHTML =
            'A link has been sent to your mail';
          setTimeout(() => {
            this.router.navigate(['loginLink']);
          }, 5000);
        } else {
          document.getElementById('forgott')!.innerHTML =
            'Invalid email or userid';
        }
      });
    } else {
      document.getElementById('forgott')!.innerHTML = 'Enter valid information';
    }
  }
}
