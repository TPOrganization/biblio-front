import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base'

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnChanges {

    @Input() questions: QuestionBase<string>[] | null = []
    @Output() submitEvent = new EventEmitter<any>()
    @Output() getFormGroup = new EventEmitter<FormGroup>()

    form!: FormGroup

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['questions']) {
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
            group[question.key] = new FormControl(question.value || '', question.required ? [Validators.required] : [])
        })
        return new FormGroup(group)
    }

}