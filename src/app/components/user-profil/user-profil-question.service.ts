import { Injectable } from '@angular/core'
import { Validators } from '@angular/forms'
import { QuestionBase } from '../../_models/_ui/dynamic-form-question/question-base'
import { TextboxQuestion } from '../../_models/_ui/dynamic-form-question/question-textbox'
import { PasswordQuestion } from '../../_models/_ui/dynamic-form-question/question-password'
import { EmailQuestion } from 'src/app/_models/_ui/dynamic-form-question/question-email'

@Injectable({
    providedIn: 'root'
})
export class UserQuestionService {

    getUpdateUser() {
        const questions: QuestionBase<string>[] = [

            new TextboxQuestion({
                key: 'lastName',
                label: 'Nom',
                value: '',
                required: true,
                order: 1
            }),

            new TextboxQuestion({
                key: 'firstName',
                label: 'Prénom',
                value: '',
                required: true,
                order: 2
            }),

            new EmailQuestion({
                key: 'email',
                label: 'Adresse mail',
                type: 'email',
                required: true,
                order: 3
            }),

        ]

        return questions.sort((a, b) => a.order - b.order)
    }

    

}