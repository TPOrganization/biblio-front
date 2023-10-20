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

    getErrorMessage(): string | void {
        const errorsForm = this.form.get(this.question.key)?.errors
        if (errorsForm) {
            for (const [key, value] of Object.entries(errorsForm)) {
                console.log("key, value", key, value)
                switch (key) {
                    case 'email':
                        return "L'email doit contenir un @" 
                    case 'minlength':
                        return `Le mot de passe doit contenir au minimun ${value['requiredLength']} caractères`
                    case 'required':
                        return "Le champs doit être renseigné"
                }
            }
        }
    }

}