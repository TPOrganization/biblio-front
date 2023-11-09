import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base';
import { FormGroup } from '@angular/forms'
import { UserQuestionService } from './user-profil-question.service';
import { AuthService } from 'src/app/_services/_api/auth/auth.service';
import { User } from 'src/app/_models/_services/_api/_database/user/user.models';
import { AxiosError } from 'axios';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { UserService } from 'src/app/_services/_api/_database/user/user.service';
import { DynamicFormComponent } from 'src/app/_ui/dynamic-form/dynamic-form.component';
import { Book } from 'src/app/_models/_services/_api/_database/book/book.models';
import { BookService } from 'src/app/_services/_api/_database/book/book.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})

export class UserProfilComponent implements OnInit {

  questions: QuestionBase<any>[]
  questionType: 'user-profil' | 'form' = 'user-profil'

  title: string

  userLogIn: User

  lastName: string
  firstName: string
  email: string

  booksOfUser: Book[] = []
  form: FormGroup

  constructor(
    private router: Router,
    private service: UserQuestionService,
    private authService: AuthService,

  ) { }

  async ngOnInit(): Promise<void> {
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
        this.title = 'MON PROFIL'
        break
      case 'form':
        this.title = 'MODIFIER MES INFORMATIONS'
        this.questions = this.service.getUpdateUserQuestion()
    }
  }

  getFormGroup = (form: FormGroup) => this.form = form

  async submit() {
    const id = this.authService.userLogIn.id
    const formValue = this.form.value
    console.log(formValue)
    // if (formValue) {
    //   const updateUserResult = await this.userService.update(id, formValue)
    //   updateUserResult instanceof AxiosError ?
    //     this.snackbarService.error('Erreur a la modification des informations') : this.snackbarService.success('Informations modifiées !')
    // }
  }

  retourTo() {
    this.router.navigate(['/dashboard'])
  }
}
