import { Component, OnInit } from '@angular/core'
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base'
import { AuthQuestionService } from './auth-question.service'
import { FormGroup } from '@angular/forms'
import { AuthForm, AuthService } from 'src/app/_services/_api/auth/auth.service'
import { SnackbarService } from 'src/app/_services/snackbar.service'
import { User } from 'src/app/_models/_services/_api/_database/user/user.models'
import { AxiosError } from 'axios'


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
    questionType: 'signIn' | 'signUp' | 'forgotPassword' = 'signIn'
    questions: QuestionBase<any>[]
    title: string
    form: FormGroup

    constructor(
        public service: AuthQuestionService,
        private authService: AuthService,
        private snackbarService: SnackbarService
    ) {
    }

    ngOnInit(): void {
        this.switchQuestions(this.questionType)
    }

    switchQuestions(type: 'signIn' | 'signUp' | 'forgotPassword') {
        this.questionType = type

        switch (type) {
            case 'signUp':
                this.questions = this.service.getSignUpQuestions()
                this.title = 'Inscription'
                break
            case 'signIn':
                this.questions = this.service.getSignInQuestions()
                this.title = 'Connexion'
                break
            case 'forgotPassword':
                this.questions = this.service.getForgotPassword()
                this.title = 'Mot de passe oublié'
        }
    }
    
    getFormGroup = (form: FormGroup) => this.form = form

    async submit(formValue: AuthForm) {
        switch (this.questionType) {
            case 'signIn':
                const signInResult = await this.authService.signIn(formValue.email, formValue.password)
                signInResult instanceof AxiosError ?
                    this.snackbarService.error('Erreur de connexion') :
                    this.snackbarService.success('Connexion réussi')

                break
            case 'signUp':
                const signUpResult = await this.authService.signUp(formValue)
                signUpResult instanceof User ?
                    this.snackbarService.success('Compte créé, bienvenue ! ') :
                    this.snackbarService.error(' Erreur à la création du compte')
                break
            case 'forgotPassword':
                const forgotPasswordResult = await this.authService.forgotPassword(formValue.email)
                forgotPasswordResult instanceof AxiosError ?
                    this.snackbarService.error('Erreur à l\'envoi de mail') :
                    this.snackbarService.success('Mail envoyé')
                break
        }
    }
}
