import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/_models/_services/_api/_database/user/user.models'
import { AuthService } from 'src/app/_services/_api/auth/auth.service'

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    user : User
    constructor(
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        if(localStorage.getItem('appCurentUser')){
            this.user = JSON.parse(localStorage.getItem('appCurentUser')  || '{}')
        }
    }

    logOut(){
        this.authService.logOut()
    }

}
