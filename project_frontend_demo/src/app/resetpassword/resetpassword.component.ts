import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChangePasswordDto } from '../model/change-password-dto';
import { LoginForgetDto } from '../model/login-forget-dto';
import { Password } from '../password';
import { UserService } from '../service/user.service';
import { User } from '../user';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  password: Password = new Password();
  changePasswordDto: ChangePasswordDto = new ChangePasswordDto();
  loginforgetdto: LoginForgetDto = new LoginForgetDto();
  loggedInUser1: User = new User();
  loggedInUser = Number(localStorage.getItem("Id"));

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  checkPassword(passwordForm: NgForm) {
    if (this.password.newPassword != this.password.confirmPassword) {
      document.getElementById("changePassword")!.innerHTML = "Confirm Password is not matching";
    }
    else if (passwordForm.valid) {
      document.getElementById("changePassword")!.innerHTML = "";
      console.log(this.password); //obj will be sent to server thru Api calls
      this.changePasswordDto.userId = Number(localStorage.getItem("Id"));
      this.changePasswordDto.userId = this.loggedInUser;
      this.changePasswordDto.password = this.password.confirmPassword;
      console.log(this.changePasswordDto);

      this.userService.changePassword(this.changePasswordDto).subscribe(
        fetchedString => {
          console.log(fetchedString);
          if (fetchedString) {
            document.getElementById("resultDiv")!.innerHTML = "Password Changed Successfully. Please Login with your new password";
          }
          else {
            document.getElementById("resultDiv")!.innerHTML = "Could not change the password";
          }
        }
      );
    }
    else {
      alert("Please enter correct information.");
    }
  }
}
