import { Injectable } from '@angular/core'
import { ApiModelService } from '../api-model.service'
import { AppConfigService } from 'src/app/_services/app-config.service'
import { ApiBook, Book } from 'src/app/_models/_services/_api/_database/book/book.models'
import { ApiTypesOfBooks, TypesOfBooks } from 'src/app/_models/_services/_api/_database/typesOfBooks/typesOfBooks.models'
import { ApiStatus, Status } from 'src/app/_models/_services/_api/_database/status/status.models'
import { Author } from 'src/app/_models/_services/_api/_database/author/author.models'


export interface BookForm {
    id: number
    title: string
    authorId: number
    statusId: number
    typesOfBooks: ApiTypesOfBooks
    comment: string
    startDate: Date | null
    endDate: Date | null
}

@Injectable({
    providedIn: 'root'
})

export class BookService extends ApiModelService<Book, ApiBook> {
    override entity = Book

    constructor(
        private readonly _appConfigService: AppConfigService
    ) {
        super()
        this.path = this._appConfigService.config.API_PATH.BOOK
    }

    async getDataForChips(): Promise<{ typesOfBooks: TypesOfBooks[], status: Status[], author: Author[] }> {
        const { typesOfBooks, status, author }: { typesOfBooks: ApiTypesOfBooks[], status: ApiStatus[], author: Author[] } = await this.axios.get({ path: `${this.path}/types-of-books-status-author` })
        return { typesOfBooks: typesOfBooks.map(e => new TypesOfBooks(e)), status: status.map(e => new Status(e)), author: author.map(e => new Author(e)) }
    }
}
