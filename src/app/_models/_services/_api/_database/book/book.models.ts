import { formatDateFromMoment } from 'src/app/_helpers/tools'
import { ApiTypesOfBooks, TypesOfBooks } from '../typesOfBooks/typesOfBooks.models'


export interface ApiBook {
    id: number
    title: string
    authorId: number
    typesOfBooks: ApiTypesOfBooks[]
    statusId: number
    comment: string
    startDate: Date | null
    endDate: Date | null
}

export interface BookFormData {
    id: number
    title: string
    authorId: number
    typesOfBooks: number[]
    statusId: number
    comment: string
    startDate: Date | null
    endDate: Date | null
}

export class Book {
    id: number
    title: string
    authorId: number
    statusId: number
    typesOfBooks: TypesOfBooks[]
    comment: string
    startDate: Date | null
    endDate: Date | null

    constructor(data: ApiBook | null) {
        this.id = data ? data.id : 0
        this.title = data ? data.title : ''
        this.authorId = data ? data.authorId : 0
        this.statusId = data ? data.statusId : 0
        this.typesOfBooks = data ? data.typesOfBooks.map(e => new TypesOfBooks(e)) : []
        this.comment = data ? data.comment : ''
        this.startDate = data && data.startDate ? new Date(data.startDate) : null
        this.endDate = data && data.endDate ? new Date(data.endDate) : null
    }

    getApiData(): ApiBook {
        return {
            id: this.id,
            title: this.title,
            authorId: this.authorId,
            statusId: this.statusId,
            typesOfBooks: this.typesOfBooks.map(e => e.getApiData()),
            comment: this.comment,
            startDate: this.startDate ? formatDateFromMoment(this.startDate) as any : null,
            endDate: this.endDate ? formatDateFromMoment(this.endDate) as any : null
        }
    }
}
