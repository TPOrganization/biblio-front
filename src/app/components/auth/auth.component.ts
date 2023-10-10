import { Component } from '@angular/core';
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base';
import { AuthQuestionService } from './auth-question.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  signInQuestions: QuestionBase<any>[];

  constructor(service: AuthQuestionService) {
    this.signInQuestions = service.getSignInQuestions();
  }

  submit(formValue:any){
    console.log(formValue)
  }
}
