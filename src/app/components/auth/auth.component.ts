import { Component, OnInit } from '@angular/core';
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base';
import { AuthQuestionService } from './auth-question.service';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/_api/auth/auth.service';

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
    public service: AuthQuestionService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.switchQuestions(this.questionType)
  }

  switchQuestions(type: 'signIn' | 'signUp' | 'forgotPassword') {
    this.questionType = type


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

  async submit(formValue: NgForm) {
    switch(this.questionType){
      case 'signIn' : 
      await this.authService.signIn(formValue)
      break
      case 'signUp' : 
      await this.authService.signUp(formValue)
      break
      // case 'forgotPassword': 
      // await this.authService.forgotPassword()
      // break
    }  
  }
}
