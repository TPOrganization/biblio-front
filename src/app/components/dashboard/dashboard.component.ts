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

    isMobile: boolean = false
    typesOfBooks: string[] = []
    booksOfUser: Book[] = []
    booksCurrentReading: Book[] = []
    currentlyStatusOfReading: number

    constructor(
        public authService: AuthService,
        private router: Router,
        private bookService: BookService,
    ) { }


    async ngOnInit(): Promise<void> {

        this.isMobile = isMobileDevice()
        const { typesOfBooks } = (await this.bookService.getDataForChips())
        this.typesOfBooks = typesOfBooks.map((e) => e.label)

        const booksOfUser = await this.bookService.find()
        if (!(booksOfUser instanceof AxiosError)) {
            this.booksOfUser = booksOfUser
            this.booksCurrentReading = booksOfUser.filter(book => book.statusId === 2)
        }
    }

    goToUserProfil() {
        this.router.navigate(['/user'])
    }

    createBook() {
        this.router.navigate(['/book-infos'])
    }

    bookInfos(id: number) {
        this.router.navigate([`/book-infos/${id}`])
    }



}
