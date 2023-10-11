import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base';

@Component({
  selector: 'app-custom-mat-card',
  templateUrl: './custom-mat-card.component.html',
  styleUrls: ['./custom-mat-card.component.scss']
})
export class CustomMatCardComponent {
  @Input() title:string
  @Input() questions: QuestionBase<string>[] | null = [];
  @Output() submitEvent = new EventEmitter<any>();
}
