import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule, SharedModule} from 'primeng/primeng';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Angular modules
import {HomeModule} from './rosm-homepage/home.module';
import {MenuModule} from './Shared/Menu/menu.module';
import {RegistryHomeModule} from './rosm-registry-homepage/registry-homepage.module';
import {RouterModule} from '@angular/router';
import {RepositoryHomeModule} from './rosm-repository-homepage/repository-homepage.module';

// Angular components

import {HomeComponent} from './rosm-homepage/home.component';
import {RegistryHomeComponent} from './rosm-registry-homepage/registry-homepage.component';
import {RepositoryHomeComponent} from './rosm-repository-homepage/repository-homepage.component';
import { HomeActions } from './rosm-homepage/home.actions';
import { RegistryPackageActions } from './rosm-registry-homepage/registry-homepage.actions';
import {PackageServices} from './packages/package.service';
import {LoginModalModule} from './rosm-login-modal/login-modal.module';

// redux imports
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { createLogger } from 'redux-logger';
import { IAppState, rootReducer } from './store';
import { environment } from '../environments/environment';
import {LoginModalComponent} from './rosm-login-modal/login-modal.component';
import {PackagePageModule} from './package-page/package-page.module';
import {PackagePageComponent} from './package-page/package-page.component';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    LoginModalModule,
    PackagePageModule,
    NgReduxModule,
    HomeModule,
    ButtonModule,
    SharedModule,
    MenuModule,
    NgbModule.forRoot(),
    RegistryHomeModule,
    RepositoryHomeModule,
    RouterModule.forRoot([
      { path: 'home',
        component: HomeComponent,
        pathMatch: 'full'},
      {
        path: 'index.html',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]),
    RouterModule.forChild([
      { path: 'registry-homepage', component: RegistryHomeComponent},
      { path: 'repository-homepage', component: RepositoryHomeComponent},
      { path: 'package-page/:packageID', component: PackagePageComponent}
    ])
  ],
  providers: [HomeActions, RegistryPackageActions, PackageServices],
  bootstrap: [AppComponent],
  entryComponents: [LoginModalComponent]
})
export class AppModule {
  constructor(private _ngRedux: NgRedux<IAppState>, private _devTool: DevToolsExtension) {
    // create redux store with logging and dev tools enabled
    _ngRedux.configureStore(
      rootReducer,
      {},
      environment.production ? [] : [createLogger()],
      [environment.production && _devTool.isEnabled() ? _devTool.enhancer() : f => f]
    );
  }
}
