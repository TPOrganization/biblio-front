import { Validators } from '@angular/forms'
import { QuestionBase } from './question-base'

export class EmailQuestion extends QuestionBase<string> {
    override controlType = 'email'
    override type = 'email'
    override validators = [Validators.email]

}