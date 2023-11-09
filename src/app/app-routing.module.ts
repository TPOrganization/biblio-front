import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthComponent } from './components/auth/auth.component'
import { AuthGuardService } from './_services/auth-guard.service'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { UserProfilComponent } from './components/user-profil/user-profil.component'
import { BooksComponent } from './components/books/books.component'
import { BookInfosComponent } from './components/book-infos/book-infos.component'

const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: 'user', component: UserProfilComponent, canActivate: [AuthGuardService] },
    { path: 'book', component: BooksComponent, canActivate: [AuthGuardService] },
    { path: 'book-infos/:id', component: BookInfosComponent, canActivate: [AuthGuardService] },
    { path: '**', redirectTo: '' },
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}


