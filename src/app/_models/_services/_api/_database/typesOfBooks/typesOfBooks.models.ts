export interface ApiTypesOfBooks {
    id: number
    label: string
}

export class TypesOfBooks {
    id: number
    label: string

    constructor(data: ApiTypesOfBooks) {
        this.id = data.id ?? 0
        this.label = data.label ?? ''
    }

    getApiData(): ApiTypesOfBooks {
        return {
            id: this.id,
            label: this.label
        }
    }
}