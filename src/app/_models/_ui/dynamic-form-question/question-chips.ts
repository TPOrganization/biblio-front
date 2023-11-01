import { QuestionBase } from './question-base'

export class ChipsQuestion extends QuestionBase<string> {
    override controlType = 'chips'
}