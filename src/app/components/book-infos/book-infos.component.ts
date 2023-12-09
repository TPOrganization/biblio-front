import { Component, HostListener, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ApiBook, Book, BookFormData } from 'src/app/_models/_services/_api/_database/book/book.models'
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base'
import { Status } from 'src/app/_models/_services/_api/_database/status/status.models'
import { Author } from 'src/app/_models/_services/_api/_database/author/author.models'
import { FormGroup } from '@angular/forms'
import { BookService } from 'src/app/_services/_api/_database/book/book.service'
import { AxiosError } from 'axios'
import { MatDialogComponent } from 'src/app/_ui/mat-dialog/mat-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { BookInfosQuestionService } from './book-infos-question.service'
import { isMobileDevice } from 'src/app/_helpers/tools'
import { SnackbarService } from 'src/app/_services/snackbar.service'
import { TypesOfBooks } from 'src/app/_models/_services/_api/_database/typesOfBooks/typesOfBooks.models'

@Component({
    selector: 'app-book-infos',
    templateUrl: './book-infos.component.html',
    styleUrls: ['./book-infos.component.scss']
})
export class BookInfosComponent implements OnInit {
    @Input() title: string


    questions: QuestionBase<any>[]
    questionType: 'book-infos' | 'form-update' = 'book-infos'

    bookSelectedInfos: BookFormData
    bookSelectedAuthorOfBook: Author | undefined
    bookSelectedStatus: Status | undefined
    bookSelectedTypesOfBookLabel: TypesOfBooks[]

    btnTxt: string
    isMobile: boolean = false
    isUpdate: boolean = false

    private _typesOfBooks: TypesOfBooks[] = []
    private _status: Status[] = []
    private _authors: Author[] = []
    form: FormGroup

    @Input() id !: number

    constructor(
        private router: Router,
        private bookInfosQuestionService: BookInfosQuestionService,
        private bookService: BookService,
        public dialog: MatDialog,
        public snackbarService: SnackbarService
    ) { }

    async ngOnInit(): Promise<void> {
        this.isUpdate = !!this.id

        await this._fetchData()

        const bookSelected = this.isUpdate ?
            await this.bookService.findOne(this.id) :
            new Book(null)

        this.questionType = this.isUpdate ? 'book-infos' : 'form-update'

        if (!(bookSelected instanceof AxiosError)) {
            this.bookSelectedInfos = {
                ...bookSelected,
                typesOfBooks: bookSelected.typesOfBooks.map(e => e.id)
            }
            this.bookSelectedAuthorOfBook = this._authors.find(e => e.id === bookSelected.authorId)
            this.bookSelectedStatus = this._status.find(e => e.id === bookSelected.statusId)
            this.bookSelectedTypesOfBookLabel = bookSelected.typesOfBooks
        } else {
            this.snackbarService.error('Erreur lors de la récupération du livre')
        }

        this._fetchQuestions()
        this.switchQuestions(this.questionType)
    }

    @HostListener('window:resize')
    onResize() {
        this.isMobile = isMobileDevice()
    }

    switchQuestions(type: 'book-infos' | 'form-update') {
        this.questionType = type
        switch (type) {
            case 'book-infos':
                break
            case 'form-update':
                if (this.isUpdate) {
                    this.title = 'Modifier les informations du livre'
                    this.btnTxt = 'Modifier'
                } else {
                    this.title = 'Ajouter un livre'
                    this.btnTxt = 'Ajouter'
                }
                this.questions = this.bookInfosQuestionService.getBookQuestion(
                    this._typesOfBooks,
                    this._status,
                    this._authors
                )
                break
        }
    }

    openDialog(): void {
        this.dialog.open(MatDialogComponent, {
            width: '250px',
            height: '250px',
            data: this.bookSelectedInfos.id
        })
    }

    getFormGroup = (form: FormGroup) => this.form = form

    async submit(form: BookFormData) {
        const newApiBook: ApiBook = {
            ...form,
            typesOfBooks: form.typesOfBooks.map(e => {
                return new TypesOfBooks({ id: e, label: '' })
            })
        }
        const newBook = new Book(newApiBook)
        const updateBookResult = this.isUpdate ?
            await this.bookService.update(this.bookSelectedInfos.id, newBook.getApiData()) :
            await this.bookService.create(newBook.getApiData())
        if (updateBookResult instanceof AxiosError) {
            this.snackbarService.error('Erreur à la modification du livre')
        } else {
            this.snackbarService.success(
                this.isUpdate ? 'Livre modifié !' : 'Livre ajouté !'
            )
            this.router.navigate(['/dashboard'])
        }
    }

    private async _fetchData() {
        const { typesOfBooks, status, author } = await this.bookService.getDataForChips()
        this._typesOfBooks = typesOfBooks
        this._status = status
        this._authors = author
        this._fetchQuestions()
    }

    private _fetchQuestions() {
        this.questions = this.bookInfosQuestionService.getBookQuestion(
            this._typesOfBooks,
            this._status,
            this._authors
        )
    }

    retourTo() {
        this.router.navigate(['/dashboard'])
    }
}
