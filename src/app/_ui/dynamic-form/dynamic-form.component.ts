import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { User } from 'src/app/_models/_services/_api/_database/user/user.models'
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base'

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnChanges {

    @Input() questions: QuestionBase<string>[] | null = []
    @Input() initialData: any = {}
    @Output() submitEvent = new EventEmitter<any>()
    @Output() getFormGroup = new EventEmitter<FormGroup>()

    form!: FormGroup

    user: User
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['questions'] || changes['initialData']) {
            this.form = this.toFormGroup()
            this.getFormGroup.emit(this.form)
        }
    }


    onSubmit() {
        this.submitEvent.emit(this.form.getRawValue())
    }

    toFormGroup() {
        const group: any = {}
        this.questions?.forEach(question => {
            const validators = question.validators
            if (question.required) {
                validators.push(Validators.required)
            }

            const initialValue = this.initialData[question.key] ?? question.value
            group[question.key] = new FormControl(initialValue|| '', validators)
        })
        return new FormGroup(group)
    }

}