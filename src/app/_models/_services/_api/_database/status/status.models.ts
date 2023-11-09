export interface ApiStatus {
    id: number
    label: string
}

export class Status {
    id: number
    label: string

    constructor(data: ApiStatus) {
        this.id = data.id ?? 0
        this.label = data.label ?? ''
    }
}