import { Injectable } from '@angular/core'
import { Validators } from '@angular/forms'
import { QuestionBase } from '../../_models/_ui/dynamic-form-question/question-base'
import { TextboxQuestion } from '../../_models/_ui/dynamic-form-question/question-textbox'
import { ChipsQuestion } from 'src/app/_models/_ui/dynamic-form-question/question-chips'
import { TextareaQuestion } from 'src/app/_models/_ui/dynamic-form-question/question-textarea'
import { DatepickerQuestion } from 'src/app/_models/_ui/dynamic-form-question/question-datepicker'

@Injectable({
    providedIn: 'root'
})
export class BookQuestionService {

    getAddBookQuestion() {
        const questions: QuestionBase<string>[] = [

            new TextboxQuestion({
                key: 'title',
                label: 'Titre',
                value: '',
                required: true,
                order: 1
            }),

            new TextboxQuestion({
                key: 'author',
                label: 'Auteur',
                value: '',
                required: true,
                order: 2
            }),

            new ChipsQuestion({
                key: 'genre',
                label: 'Genre littéraire',
                options: [
                  {key: '1',  value: 'Fantaisie'},
                  {key: '2',  value: 'Comtemporain'},
                  {key: '3',   value: 'Fiction'},
                  {key: '4', value: 'Romance'}
                ],
                order: 3
              }),

              new TextareaQuestion ({
                key: 'comment',
                label: 'Commentaire',
                value: '',
                required: true,
                order: 4
            }),

              new ChipsQuestion({
                key: 'status',
                label: 'Statut',
                options: [
                  {key: '1',  value: 'A lire'},
                  {key: '2',  value: 'En cours'},
                  {key: '3',   value: 'Terminé'},
                  {key: '4', value: 'Wishlist'}
                ],
                order: 5
              }),

              new DatepickerQuestion({
                key: 'startDate',
                label: "Date de début",
                type: 'datepicker',
                order: 6
              }),
              
              new DatepickerQuestion({
                key: 'endDate',
                label: "Date de fin",
                type: 'datepicker',
                order: 7
              })
        ]

        return questions.sort((a, b) => a.order - b.order)
    }

    

}