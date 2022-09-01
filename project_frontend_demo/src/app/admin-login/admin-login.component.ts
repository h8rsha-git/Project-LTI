import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from '../model/login-dto';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  loginDto: LoginDto = new LoginDto();
  constructor(private serviceAdmin: AdminService, private router: Router) {}

  ngOnInit(): void {
    // this.serviceAdmin.createAdmin();
    //console.log('I created an admin for you');
  }

  checkAdminLogin(loginForm: NgForm): void {
    if (loginForm.valid) {
      this.serviceAdmin.loginAdmin(this.loginDto).subscribe((loginAdmin) => {
        console.log(loginAdmin);
        if (loginAdmin == true) {
          sessionStorage.setItem('adminId', this.loginDto.id.toString());
          this.router.navigate(['adminDashBoardLink']);
        } else {
          document.getElementById('allmsg')!.innerHTML =
            'Invalid password or adminId';
        }
      });
    } else {
      document.getElementById('allmsg')!.innerHTML =
        ' Please fill all the details';
    }
  }
}
