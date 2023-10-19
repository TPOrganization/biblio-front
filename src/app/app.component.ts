import { Component } from '@angular/core'
import { AuthQuestionService } from './components/auth/auth-question.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [AuthQuestionService]
})
export class AppComponent {

}