import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';
import { LoginDto } from '../model/login-dto';
import { UserService } from '../service/user.service';

import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  userEmail: string;
  loginDto: LoginDto = new LoginDto();
  constructor(private service: UserService, private router: Router) {} //injected router object
  ngOnInit(): void {}

  // method -> email -> id
  checkLogin(loginForm: NgForm): void {
    if (loginForm.valid) {
      // dto -< id
      this.service
        .getIdByEmail(this.userEmail)
        .subscribe((userDetails: User) => {
          this.loginDto.id = userDetails.userId;
        });
      // loading
      this.service.loginUser(this.loginDto).subscribe((loginUser) => {
        console.log(loginUser);
        if (loginUser == true) {
          sessionStorage.setItem('userId', this.loginDto.id.toString());
          sessionStorage.setItem('status', true.valueOf.toString());
          this.router.navigate(['userDashBoard']).then(() => {
            //window.location.reload();
          });
        }
      });
    } else {
      document.getElementById('allmsg')!.innerHTML =
        ' Please fill all the details';
    }
  }
}
