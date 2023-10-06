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

const appInitializerFn = (appConfigService: AppConfigService) => () => appConfigService.loadAppConfig()

registerLocaleData(localeFr, 'fr')

@NgModule({
    declarations: [
        // Directive

        // Pipe

        // UI

        // App Component
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
