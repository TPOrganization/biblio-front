import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base';
import { FormGroup } from '@angular/forms'
import { BookQuestionService } from './book-question.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit{
  form: FormGroup
  questions: QuestionBase<any>[]

  @Output() submitEvent = new EventEmitter<any>()
  @Output() getFormGroup = new EventEmitter<FormGroup>()
  
  constructor(
    private router: Router,
    private service : BookQuestionService
  ) { }

  ngOnInit(): void {
    this.questions = this.service.getAddBookQuestion()
  }

  retourTo() {
    this.router.navigate(['/dashboard'])
  }
}
