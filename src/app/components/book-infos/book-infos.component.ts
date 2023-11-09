import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/_models/_services/_api/_database/book/book.models';
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base';
import { BookQuestionService } from '../books/book-question.service';
import { Type } from 'src/app/_models/_services/_api/_database/type/type.models';
import { Status } from 'src/app/_models/_services/_api/_database/status/status.models';
import { Author } from 'src/app/_models/_services/_api/_database/author/author.models';
import { FormGroup } from '@angular/forms';
import { BookService } from 'src/app/_services/_api/_database/book/book.service';

@Component({
  selector: 'app-book-infos',
  templateUrl: './book-infos.component.html',
  styleUrls: ['./book-infos.component.scss']
})
export class BookInfosComponent {

  questions: QuestionBase<any>[]
  questionType: 'book-infos' | 'form' = 'book-infos'

  book: Book
  private _types: Type[] = []
  private _status: Status[] = []
  private _author: Author[] = [];
  form: FormGroup

  @Input() id: number
  @Input() test: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookQuestionService: BookQuestionService,
  ) { }

  async ngOnInit(): Promise<void> {

    console.log(this.test)

    this.switchQuestions(this.questionType)
  }


  switchQuestions(type: 'book-infos' | 'form') {
    this.questionType = type

    switch (type) {
      case 'book-infos':
        break
      case 'form':
        this.questions = this.bookQuestionService.getAddBookQuestion(
          this._types,
          this._status,
          this._author
        )
    }
  }

  getFormGroup = (form: FormGroup) => this.form = form

  async submit() { }

  retourTo() {
    this.router.navigate(['/dashboard'])
  }
}