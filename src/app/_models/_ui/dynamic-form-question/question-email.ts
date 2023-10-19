import { QuestionBase } from './question-base'

export class EmailQuestion extends QuestionBase<string> {
    override controlType = 'email'
    override type = 'email'
}