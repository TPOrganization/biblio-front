export interface ApiBook {
    id: number
    title: string
    author: string
    type: number
    statusId: number
    comment: string
    startDate: string
    endDate: string
}

export class Book {
    id: number
    title: string
    author: string
    statusId: number
    type: number
    comment: string
    startDate: string
    endDate: string

    constructor(data: ApiBook) {
        this.id = data.id ?? 0
        this.title = data.title ?? ''
        this.author = data.author ?? ''
        this.statusId = data.statusId ?? 0
        this.type = data.type ?? 0
        this.comment = data.comment ?? ''
        this.startDate = data.startDate ?? ''
        this.endDate = data.endDate ?? ''

    }

    getApiData(): ApiBook {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            statusId: this.statusId,
            type: this.type,
            comment: this.comment,
            startDate: this.startDate,
            endDate: this.endDate,
        }
    }
}