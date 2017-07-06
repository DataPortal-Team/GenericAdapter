import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ConfiguratorComponent} from './components/configurator/configurator.component';
import {SelectorComponent} from './components/selector/selector.component';
import {AppRoutingModule} from './app.routing';

import {DataPortalSenderService} from './services/data-portal-sender/data-portal-sender.service';
import {DataPortalIFrameService} from './services/data-portal-iframe/data-portal-iframe.service';


@NgModule({
    declarations: [
        AppComponent,
        ConfiguratorComponent,
        SelectorComponent
    ],
    imports: [
        HttpModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [
        DataPortalIFrameService,
        DataPortalSenderService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
