import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, HostListener, ViewChild, ElementRef } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
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
            group[question.key] = new FormControl(initialValue || '', validators)
        })
        return new FormGroup(group)
    }

    private _isEnterKeyUp: boolean = false
    @ViewChild('reactivForm') reactivForm: ElementRef
    @HostListener('document:keydown', ['$event'])
    private _handleKeyboardEvent(event: KeyboardEvent) {
        const target = event.target as HTMLInputElement
        switch (event.key) {
            case 'Enter':
                this._isEnterKeyUp = true
                const control = this.reactivForm.nativeElement.querySelector(`[id="${target?.id}"]`)
                if (
                    this.form.valid &&
                    target?.type !== 'textarea' &&
                    control
                ) {
                    this.onSubmit()
                }
                break
            default:
                this._isEnterKeyUp = false
                break
        }
    }
}