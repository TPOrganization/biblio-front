export interface ApiAuthor {
    id: number
    name: string
}

export class Author {
    id: number
    name: string

    constructor(data: ApiAuthor) {
        this.id = data.id ?? 0
        this.name = data.name ?? ''
    }
}