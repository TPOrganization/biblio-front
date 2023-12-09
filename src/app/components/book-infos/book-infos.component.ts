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
    @Input() id !: number

    questions: QuestionBase<any>[]
    questionType: 'book-infos' | 'form-update' = 'book-infos'

    bookSelectedInfos: BookFormData | null = null
    bookSelectedAuthorOfBook: Author | undefined
    bookSelectedStatus: Status | undefined
    bookSelectedTypesOfBookLabel: TypesOfBooks[]

    btnTxt: string
    isMobile: boolean = isMobileDevice()
    isUpdate: boolean = false
    form: FormGroup | null

    private _typesOfBooks: TypesOfBooks[] = []
    private _status: Status[] = []
    private _authors: Author[] = []

    constructor(
        private readonly _bookService: BookService,
        private readonly _bookInfosQuestionService: BookInfosQuestionService,
        private readonly _router: Router,
        private readonly _dialog: MatDialog,
        private readonly _snackbarService: SnackbarService
    ) { }

    async ngOnInit(): Promise<void> {
        this.isUpdate = !!this.id

        await this._fetchData()

        const bookSelected = this.isUpdate ?
            await this._bookService.findOne(this.id) :
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
            this._snackbarService.error('Erreur lors de la récupération du livre')
        }

        this._fetchQuestions()
        this.switchQuestions(this.questionType)
    }

    @HostListener('window:resize')
    onResize() { this.isMobile = isMobileDevice() }
    getFormGroup = (form: FormGroup) => this.form = form
    switchQuestions(type: 'book-infos' | 'form-update') {
        this.questionType = type
        switch (type) {
            case 'book-infos':
                if (!this.isUpdate) {
                    this._router.navigate(['/dashboard'])
                }
                break
            case 'form-update':
                if (this.isUpdate) {
                    this.title = 'Modifier les informations du livre'
                    this.btnTxt = 'Modifier'
                } else {
                    this.title = 'Ajouter un livre'
                    this.btnTxt = 'Ajouter'
                }
                this.questions = this._bookInfosQuestionService.getBookQuestion(
                    this._typesOfBooks,
                    this._status,
                    this._authors
                )
                break
        }
    }

    openDialog(): void {
        this._dialog.open(MatDialogComponent, {
            width: '250px',
            height: '250px',
            data: this.bookSelectedInfos?.id
        })
    }


    async submit(form: BookFormData) {
        const newApiBook: ApiBook = {
            ...form,
            typesOfBooks: form.typesOfBooks.map(e => {
                return new TypesOfBooks({ id: e, label: '' })
            })
        }
        const newBook = new Book(newApiBook)
        newBook.id = this.bookSelectedInfos?.id ?? 0
        const updateBookResult = this.isUpdate ?
            await this._bookService.update(newBook.id, newBook.getApiData()) :
            await this._bookService.create(newBook.getApiData())
        if (updateBookResult instanceof AxiosError) {
            this._snackbarService.error('Erreur à la modification du livre')
        } else {
            this._snackbarService.success(
                this.isUpdate ? 'Livre modifié !' : 'Livre ajouté !'
            )
            this._router.navigate(['/dashboard'])
        }
    }

    private async _fetchData() {
        const { typesOfBooks, status, author } = await this._bookService.getDataForChips()
        this._typesOfBooks = typesOfBooks
        this._status = status
        this._authors = author
        this._fetchQuestions()
    }

    private _fetchQuestions() {
        this.questions = this._bookInfosQuestionService.getBookQuestion(
            this._typesOfBooks,
            this._status,
            this._authors
        )
    }
}
