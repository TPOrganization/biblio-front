import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AxiosError } from 'axios'
import { isMobileDevice } from 'src/app/_helpers/tools'
import { Book } from 'src/app/_models/_services/_api/_database/book/book.models'
import { TypesOfBooks } from 'src/app/_models/_services/_api/_database/typesOfBooks/typesOfBooks.models'
import { BookService } from 'src/app/_services/_api/_database/book/book.service'
import { AuthService } from 'src/app/_services/_api/auth/auth.service'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    bookAuthorFilter: string = ''
    booksCurrentReading: Book[] = []
    booksFiltered: Book[] = []

    typesOfBooks: TypesOfBooks[] = []
    typesOfBooksSelected: number[] = []

    private _booksOfUser: Book[] = []

    constructor(
        public authService: AuthService,
        private readonly _router: Router,
        private readonly _bookService: BookService,
    ) { }

    ngOnInit(): void { this._fetchData() }
    goToUserProfil() { this._router.navigate(['/user']) }
    createBook() { this._router.navigate(['/book-infos']) }
    bookInfos(id: number) { this._router.navigate([`/book-infos/${id}`]) }

    typesOfBooksSelectedChange() { this.bookAuthorFilterChange(this.bookAuthorFilter) }
    bookAuthorFilterChange(term: string) {
        const filteredBooks = term ?
            [...this._booksOfUser].filter(e => e.title.includes(term)) :
            [...this._booksOfUser]
        this.booksFiltered = filteredBooks.filter(book =>
            !this.typesOfBooksSelected.length ||
            book.typesOfBooks.map(e => e.id).some(e => this.typesOfBooksSelected.includes(e))
        )
        this.booksCurrentReading = filteredBooks.filter(book => book.statusId === 2)
    }

    private async _fetchData() {
        const { typesOfBooks } = await this._bookService.getDataForChips()
        this.typesOfBooks = typesOfBooks
        const booksOfUser = await this._bookService.find()
        if (!(booksOfUser instanceof AxiosError)) {
            this._booksOfUser = booksOfUser
            this.bookAuthorFilterChange('')
        }
    }
}
