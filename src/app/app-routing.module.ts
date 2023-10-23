import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthComponent } from './components/auth/auth.component'
import { AuthGuardService } from './_services/auth-guard.service'
import { DashboardComponent } from './components/dashboard/dashboard.component'

const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
