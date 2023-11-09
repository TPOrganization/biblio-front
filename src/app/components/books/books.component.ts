import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base';
import { FormGroup } from '@angular/forms'
import { BookQuestionService } from './book-question.service';
import { BookService } from 'src/app/_services/_api/_database/book/book.service';
import { AxiosError } from 'axios';
import { SnackbarService } from 'src/app/_services/snackbar.service';
import { Status } from 'src/app/_models/_services/_api/_database/status/status.models';
import { Type } from 'src/app/_models/_services/_api/_database/type/type.models';
import { LoadingSpinnerService } from 'src/app/_services/overlay.service';
import { AuthService } from 'src/app/_services/_api/auth/auth.service';
import { Author } from 'src/app/_models/_services/_api/_database/author/author.models';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  questions: QuestionBase<any>[]
  form: FormGroup

  private _types: Type[] = []
  private _status: Status[] = []
  private _author: Author[] = [];


  constructor(
    private router: Router,
    private bookQuestionService: BookQuestionService,
    private bookService: BookService,
    private snackbarService: SnackbarService,
    private loadingService: LoadingSpinnerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this._fetchData()
  }

  getFormGroup = (form: FormGroup) => this.form = form

  async submit() {
    const formValue = this.form.value
    this.form.value.type = this.form.value.type.map((e: number) => { return { id: e } })
    const userId = this.authService.userLogIn.id // A MODIF
    const dataForm = {
      ...formValue,
      userId
    }
    console.log(dataForm)
    //   if (dataForm) {

    //     const updateUserResult = await this.bookService.create(dataForm)
    //     console.log(updateUserResult)
    //     updateUserResult instanceof AxiosError ?
    //       this.snackbarService.error("Erreur a l'ajout du livre") : this.snackbarService.success('Livre ajouté !')
    //   }

    //  //   formater les dates
    // }
  }

  retourTo() {
    this.router.navigate(['/dashboard'])
  }

  private async _fetchData() {
    this.loadingService.attachOverlay()
    const { types, status, author } = await this.bookService.getDataForChips()
    this._types = types
    this._status = status
    this._author = author
    this._fetchQuestions()
    this.loadingService.detachOverlay()
  }

  private _fetchQuestions() {
    this.questions = this.bookQuestionService.getAddBookQuestion(
      this._types,
      this._status,
      this._author
    )

  }
}
