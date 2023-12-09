import { Component, OnInit, HostListener } from '@angular/core'
import { Router } from '@angular/router'
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base'
import { FormGroup } from '@angular/forms'
import { UserQuestionService } from './user-profil-question.service'
import { AuthService } from 'src/app/_services/_api/auth/auth.service'
import { ApiUser, User } from 'src/app/_models/_services/_api/_database/user/user.models'
import { UserService } from 'src/app/_services/_api/_database/user/user.service'
import { Book } from 'src/app/_models/_services/_api/_database/book/book.models'
import { Chart } from 'chart.js/auto'
import { AxiosError } from 'axios'
import { BookService } from 'src/app/_services/_api/_database/book/book.service'
import { isMobileDevice } from 'src/app/_helpers/tools'
import { SnackbarService } from 'src/app/_services/snackbar.service'

@Component({
    selector: 'app-user-profil',
    templateUrl: './user-profil.component.html',
    styleUrls: ['./user-profil.component.scss']
})


export class UserProfilComponent implements OnInit {

    chart: any

    status1: Book[] = []
    status2: Book[] = []
    status3: Book[] = []
    status4: Book[] = []

    form: FormGroup
    questions: QuestionBase<any>[]
    questionType: 'user-profil' | 'form' = 'user-profil'

    title: string
    textBtn: string
    userLogIn: User
    isMobile: boolean

    constructor(
        private readonly _router: Router,
        private readonly _userQuestionService: UserQuestionService,
        private readonly _userService: UserService,
        private readonly _authService: AuthService,
        private readonly _bookService: BookService,
        private readonly _snackbarService: SnackbarService
    ) { }

    async ngOnInit(): Promise<void> {
        this.textBtn = 'Modifier les informations'
        this.isMobile = isMobileDevice()
        this.userLogIn = this._authService.userLogIn
        await this._fetchData()
        this.switchQuestions(this.questionType)
    }

    @HostListener('window:resize')
    onResize() { this.isMobile = isMobileDevice() }
    logOut() { this._authService.logOut() }
    getFormGroup = (form: FormGroup) => { this.form = form }
    switchQuestions(type: 'user-profil' | 'form') {
        this.questionType = type
        switch (type) {
            case 'user-profil':
                this.title = 'Mon profil'
                this._initChart()
                break
            case 'form':
                this.title = 'Modifier mes informations'
                this.questions = this._userQuestionService.getUpdateUserQuestion()
        }

    }

    async submit(formValue: ApiUser) {
        const id = this._authService.userLogIn.id
        formValue = {
            ...this.form.value,
            id
        }
        const newUser = new User(formValue)
        const updateUserResult = await this._userService.update(id, newUser)
        if (updateUserResult instanceof AxiosError) {
            this._snackbarService.error('Erreur à la modification des informations de l\'utilisateur')
        } else {
            this._authService.userLogIn = updateUserResult
            this._snackbarService.success('Les informations de l\'utilisateur ont bien été modifié  !')
            this._router.navigate(['/dashboard'])
        }
    }

    private async _fetchData() {
        const books = await this._bookService.find()
        if (!(books instanceof AxiosError)) {
            books.map(e => e.statusId)
            this.status1 = books.filter(e => e.statusId === 1)
            this.status2 = books.filter(e => e.statusId === 2)
            this.status3 = books.filter(e => e.statusId === 3)
            this.status4 = books.filter(e => e.statusId === 4)
        }
    }

    private _initChart() {
        setTimeout(() => { // Erreur lors du reset
            this.chart?.destroy()
            this.chart = new Chart('MyChart', {
                type: 'doughnut',
                data: {// values on X-Axis
                    datasets: [
                        {
                            data: [
                                this.status1.length,
                                this.status2.length,
                                this.status3.length,
                                this.status4.length
                            ],
                            backgroundColor: [
                                '#FF8B85',
                                '#8DD6FF',
                                '#AFCBA5',
                                '#DB82DD'
                            ],
                        },

                    ],
                    labels: ['A lire', 'En cours', 'Terminé', 'Whishlist'],
                },
                options: {
                    aspectRatio: 1.1,
                    parsing: {
                        key: 'test.value'
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    }
                }
            })
        })
    }
}
