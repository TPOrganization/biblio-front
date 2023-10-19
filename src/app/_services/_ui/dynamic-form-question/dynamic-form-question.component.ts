import { Component, Input } from '@angular/core'
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base'
import { FormGroup } from '@angular/forms'

@Component({
    selector: 'app-dynamic-form-question',
    templateUrl: './dynamic-form-question.component.html',
    styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent {
  @Input() question!: QuestionBase<string>
  @Input() form!: FormGroup


  get isValid(): boolean { return this.form.controls[this.question.key]?.valid ?? false }

  getErrorMessage() {
      if (this.question.required) {
          return 'Vous devez remplir ce champs'
      }
      return '' //<= marche pas
  }

}