import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base';
import { FormGroup } from '@angular/forms'
import { UserQuestionService } from './user-profil-question.service';
import { AuthService } from 'src/app/_services/_api/auth/auth.service';
import { ApiUser, User } from 'src/app/_models/_services/_api/_database/user/user.models';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})

export class UserProfilComponent implements OnInit {

  @Input() questions: QuestionBase<string>[] | null = []
  @Output() submitEvent = new EventEmitter<any>()
  @Output() getFormGroup = new EventEmitter<FormGroup>()


  questionType: 'user-profil' | 'form' = 'user-profil'
  title: string
  userLogIn: User
  lastName: string
  firstName: string
  email: string

  form: FormGroup
  constructor(
    private router: Router,
    private service: UserQuestionService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.switchQuestions(this.questionType)

    this.userLogIn = this.authService.userLogIn
    this.lastName = this.userLogIn.lastName
    this.firstName = this.userLogIn.firstName
    this.email = this.userLogIn.email
  }

  switchQuestions(type: 'user-profil' | 'form') {
    this.questionType = type

    switch (type) {
      case 'user-profil':
        this.title = 'Mon profil'
        break
      case 'form':
        this.title = 'Modifier mes informations'
        this.questions = this.service.getUpdateUserQuestion()
    }
  }

  retourTo() {
    this.router.navigate(['/dashboard'])
  }
}
