import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BusService } from '../service/bus.service';
import { UserService } from '../service/user.service';
import { User } from '../user';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css'],
})
export class RegisterationComponent implements OnInit {
  control = new FormControl();

  minDate = new Date();

  user: User = new User();
  userCPassword!: string;
  constructor(private userservice: UserService, private router: Router) {}

  ngOnInit() {}

  checkPassword() {
    if (this.user.password != this.userCPassword) {
      document.getElementById('resultDiv')!.innerHTML =
        'Confirm Password Is Not Matching';
    } else {
      document.getElementById('resultDiv')!.innerHTML = '';
    }
  }

  checkRegister(registerationForm: NgForm) {
    if (registerationForm.valid) {
      this.userservice.checkMailExists(this.user.email).subscribe((value) => {
        console.log(value);

        if (value == false) {
          alert('This mail ID already exists');
          console.log('HELLOOO');
          this.router.navigate(['']);
        } else {
          var modal = document.getElementById('myModal1')!;
          modal.style.display = 'block';

          // Get the button that opens the modal
          var btn1 = document.getElementById('btn1')!;
          btn1.onclick = function () {
            modal.style.display = 'block';
          };

          this.userservice
            .registerUser(this.user)
            .subscribe((userPersisted) => {
              console.log(userPersisted);

              const ticketId = Number(sessionStorage.getItem('ticketId'));

              if (ticketId != 0) {
                // kinda padati
                this.userservice
                  .addTicketToUser(ticketId, userPersisted.userId)
                  .subscribe((fetchedTicket) => {
                    console.log(fetchedTicket);
                  });
              }
            });
        }
      });
    } else {
      document.getElementById('btn2')!.innerHTML =
        'Please fill the requried details';
    }
  }
}

// regular expression -> definition
// how validation occurs in Angular (YT video)
// required, pattern enti
// ngModel enti [()] -> ee symbols enti (one-way binding and two way binding)
// #dt = ngModel and ngIf = "" , ERRORS ELA DISPLAY CHESTUNDI !!
// general ga html code refer chey -> type, placeholder, class ante emiti
// short notes refer

// store userId -> future valaki help
// router class use chesi -> user dashboard ki velta.
