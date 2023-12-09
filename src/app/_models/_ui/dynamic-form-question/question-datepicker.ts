import { QuestionBase } from './question-base'

export class DatepickerQuestion extends QuestionBase<string> {
    override controlType = 'datepicker'
    override type = 'datepicker'
}