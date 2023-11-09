import { Component, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import { AxiosError } from 'axios'
import { Book } from 'src/app/_models/_services/_api/_database/book/book.models'
import { Type } from 'src/app/_models/_services/_api/_database/type/type.models'
import { User } from 'src/app/_models/_services/_api/_database/user/user.models'
import { BookService } from 'src/app/_services/_api/_database/book/book.service'
import { AuthService } from 'src/app/_services/_api/auth/auth.service'


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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

        const { types } = (await this.bookService.getDataForChips())
        this.typesOfBooks = types.map((e) => e.label)

        const booksOfUser = await this.bookService.find()
        if (!(booksOfUser instanceof AxiosError)) {
            this.booksOfUser = booksOfUser
            this.booksCurrentReading = booksOfUser.filter(book => book.statusId === 2)
        }
    }


    logOut() {
        this.authService.logOut()
    }

    goToUserProfil() {
        this.router.navigate(['/user'])
    }

    goTobook() {
        this.router.navigate(['/book'])
    }

    goToBookInfos(bookId: number) {
        this.router.navigate([`/book-infos/${bookId}`, { test: 'test' }])
        //envoyer les informations du book sur lequel on vient de cliquer ?

    }

}
