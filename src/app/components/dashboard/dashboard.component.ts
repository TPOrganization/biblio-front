import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AxiosError } from 'axios'
import { isMobileDevice } from 'src/app/_helpers/tools'
import { Book } from 'src/app/_models/_services/_api/_database/book/book.models'
import { BookService } from 'src/app/_services/_api/_database/book/book.service'
import { AuthService } from 'src/app/_services/_api/auth/auth.service'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    isMobile: boolean = isMobileDevice()
    typesOfBooks: string[] = []
    booksOfUser: Book[] = []
    booksCurrentReading: Book[] = []

    constructor(
        public authService: AuthService,
        private readonly _router: Router,
        private readonly _bookService: BookService,
    ) { }

    ngOnInit(): void { this._fetchData() }
    goToUserProfil() { this._router.navigate(['/user']) }
    createBook() { this._router.navigate(['/book-infos']) }
    bookInfos(id: number) { this._router.navigate([`/book-infos/${id}`]) }

    private async _fetchData() {
        const { typesOfBooks } = await this._bookService.getDataForChips()
        this.typesOfBooks = typesOfBooks.map((e) => e.label)
        const booksOfUser = await this._bookService.find()
        if (!(booksOfUser instanceof AxiosError)) {
            this.booksOfUser = booksOfUser
            this.booksCurrentReading = booksOfUser.filter(book => book.statusId === 2)
        }
    }
}
