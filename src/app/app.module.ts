import { HttpClient, HttpClientModule } from '@angular/common/http'
import { LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common'
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { MaterialModule } from './material.module'
import { AppConfigService } from './_services/app-config.service'
import { AuthGuardService } from './_services/auth-guard.service'
import { AppComponent } from './app.component'
import localeFr from '@angular/common/locales/fr'
import { LoadingSpinnerComponent } from './_ui/loading-spinner/loading-spinner.component'
import { DynamicFormQuestionComponent } from './_ui/dynamic-form-question/dynamic-form-question.component'
import { AuthComponent } from './components/auth/auth.component'
import { CustomMatCardComponent } from './_ui/custom-mat-card/custom-mat-card.component'
import { DynamicFormComponent } from './_ui/dynamic-form/dynamic-form.component'
import { SnackBarComponent } from './_ui/snack-bar/snack-bar.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'



const appInitializerFn = (appConfigService: AppConfigService) => () => appConfigService.loadAppConfig()

registerLocaleData(localeFr, 'fr')

@NgModule({
    declarations: [
        AppComponent,
        DynamicFormQuestionComponent,
        LoadingSpinnerComponent,
        DynamicFormComponent,
        AuthComponent,
        CustomMatCardComponent,
        SnackBarComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    providers: [
        AppConfigService,
        AuthGuardService,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFn,
            multi: true,
            deps: [AppConfigService, HttpClient],
        },
        { provide: LOCALE_ID, useValue: 'fr' },
        { provide: LocationStrategy, useClass: PathLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
