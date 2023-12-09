import { ValidatorFn } from '@angular/forms'

export class QuestionBase<T> {
    value: T | undefined
    key: string
    label: string
    required: boolean
    order: number
    controlType: string
    type: string
    options: { key: string | number, value: string }[]
    validators: ValidatorFn[] = []

    constructor(options: {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string;
    options?: { key: string | number, value: string }[];
    validators?: ValidatorFn[]
  } = {}) {
        this.value = options.value
        this.key = options.key ?? ''
        this.label = options.label ?? ''
        this.required = options.required === true
        this.order = options.order === undefined ? 1 : options.order
        this.controlType = options.controlType ?? ''
        this.type = options.type ?? ''
        this.options = options.options || []

        if (options.validators) {
            this.validators.push(...options.validators)
        }
    }
}