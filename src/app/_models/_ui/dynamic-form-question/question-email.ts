import { QuestionBase } from './question-base';

export class emailQuestion extends QuestionBase<string> {
  override controlType = 'email';
  override type = 'email';
}