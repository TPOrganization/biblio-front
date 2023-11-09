export interface ApiType {
    id: number
    label: string
}

export class Type {
    id: number
    label: string

    constructor(data: ApiType) {
        this.id = data.id ?? 0
        this.label = data.label ?? ''
    }
}