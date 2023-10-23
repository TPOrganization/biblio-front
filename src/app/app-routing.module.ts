import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthComponent } from './components/auth/auth.component'
import { AuthGuardService } from './_services/auth-guard.service'

const routes: Routes = [
    { path: "" , component: AuthComponent }
    // { path: "/" , component: , canActivate: [AuthGuardService] }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    
}
