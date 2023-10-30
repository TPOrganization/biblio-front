import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { User } from 'src/app/_models/_services/_api/_database/user/user.models'
import { AuthService } from 'src/app/_services/_api/auth/auth.service'


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    user : User
    firstName: string

    constructor(
        private authService: AuthService,
        private router : Router
    ) { }

    ngOnInit(): void {
        this.firstName = this.authService.userLogIn.firstName
    }

    logOut(){
        this.authService.logOut()
    }

    userProfil(){
        this.router.navigate(['/user'])
    }

}
