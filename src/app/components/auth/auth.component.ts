import { Component, OnInit } from '@angular/core';
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base';
import { AuthQuestionService } from './auth-question.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  questionType: 'signIn' | 'signUp' | 'forgotPassword' = 'signIn'
  questions: QuestionBase<any>[];
  title: string
  form: FormGroup
  constructor(
    public service: AuthQuestionService) {
  }

  submit(formValue: any) {
    console.log('formValue', formValue)
  }

  ngOnInit(): void {
    this.switchQuestions(this.questionType)
  }

  switchQuestions(type: 'signIn' | 'signUp' | 'forgotPassword') {
    this.questionType = type

    console.log(this.form?.value)
    switch (type) {
      case 'signUp':
        this.questions = this.service.getSignUpQuestions();
        this.title = "Inscription"
        break
      case 'signIn':
        this.questions = this.service.getSignInQuestions();
        this.title = "Connexion"
        break
      case 'forgotPassword':
        this.questions = this.service.getForgotPassword();
        this.title = "Mot de passe oublié"
    }
  }

  getFormGroup = (form: FormGroup) => this.form = form
}
