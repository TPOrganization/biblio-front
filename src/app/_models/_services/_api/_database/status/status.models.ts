export interface ApiStatus {
    id: number
    label: string
    color:string
}

export class Status {
    id: number
    label: string
    color: string

    constructor(data: ApiStatus) {
        this.id = data.id ?? 0
        this.label = data.label ?? ''
        this.color = data.color ?? ''
    }
}