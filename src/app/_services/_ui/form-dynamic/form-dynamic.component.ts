import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base';
import { QuestionControlService } from 'src/app/_models/_ui/dynamic-form-question/question-control.service';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './form-dynamic.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<string>[] | null = [];
  @Output() submitEvent = new EventEmitter<any>(); 

  form!: FormGroup;

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
    this.submitEvent.emit(this.form.getRawValue());
  }
}