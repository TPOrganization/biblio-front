import { Injectable } from '@angular/core'
import { QuestionBase } from '../../_models/_ui/dynamic-form-question/question-base'
import { TextboxQuestion } from '../../_models/_ui/dynamic-form-question/question-textbox'
import { ChipsNoMultipleQuestion } from 'src/app/_models/_ui/dynamic-form-question/question-chips-no-multiple'
import { TextareaQuestion } from 'src/app/_models/_ui/dynamic-form-question/question-textarea'
import { DatepickerQuestion } from 'src/app/_models/_ui/dynamic-form-question/question-datepicker'
import { ChipsMultipleQuestion } from 'src/app/_models/_ui/dynamic-form-question/question-chips-multiple'
import { TypesOfBooks } from 'src/app/_models/_services/_api/_database/typesOfBooks/typesOfBooks.models'
import { Status } from 'src/app/_models/_services/_api/_database/status/status.models'
import { Author } from 'src/app/_models/_services/_api/_database/author/author.models'

@Injectable({
    providedIn: 'root'
})
export class BookInfosQuestionService {

    getBookQuestion(
        typesOfBook: TypesOfBooks[],
        status: Status[],
        author: Author[]     
    ) {
        const questions: QuestionBase<string>[] = [

            new TextboxQuestion({
                key: 'title',
                label: 'Titre',
                value: '',
                required: true,
                order: 1
            }),

            new ChipsNoMultipleQuestion({
                key: 'authorId',
                label: 'Auteur',
                options: author.map(e => {
                    return {
                        key: e.id, value: e.name
                    }
                }),
                order: 2
            }),

            new ChipsMultipleQuestion({
                key: 'typesOfBooks',
                label: 'Genre littéraire',
                options: typesOfBook.map(e => {
                    return {
                        key: e.id, value: e.label
                    }
                }),
                order: 3
            }),
              
            new TextareaQuestion ({
                key: 'comment',
                label: 'Commentaire',
                value: '',
                required: true,
                order: 4
            }),

            new ChipsNoMultipleQuestion({
                key: 'statusId',
                label: 'Statut',
                options: status.map(e => {
                    return {
                        key: e.id, value: e.label
                    }
                }),
                order: 5
            }),

            new DatepickerQuestion({
                key: 'startDate',
                label: 'Date de début',
                type: 'datepicker',
                order: 6
            }),
              
            new DatepickerQuestion({
                key: 'endDate',
                label: 'Date de fin',
                type: 'datepicker',
                order: 7
            })
        ]

        return questions.sort((a, b) => a.order - b.order)
    }

    

}