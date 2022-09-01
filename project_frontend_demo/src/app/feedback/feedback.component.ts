import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Feedback } from '../feedback';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  rating: number;
  comment: string;
  feedback: Feedback = new Feedback();

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  setRating(rating: number) {
    this.rating = rating;
  }
  submitFeedback() {
    this.feedback.rating = this.rating;
    this.feedback.userText = this.comment;
    this.userService.userFeedback(this.feedback).subscribe(() => {
      console.log(this.rating + '' + this.comment);
    });
  }
}
