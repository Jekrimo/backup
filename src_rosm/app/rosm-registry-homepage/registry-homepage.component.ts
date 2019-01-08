
import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormBuilder } from '@angular/forms';
import 'rxjs/add/observable/combineLatest';
import { RegistryPackageActions} from '../packages/package.actions';
import {HttpClient} from '@angular/common/http';
import {buildURL} from '../Shared/util.web-api';
import {Observable} from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import {Router} from '@angular/router';


@Component({
  selector: 'app-internal-home',
  templateUrl: './registry-homepage.component.html',
  styleUrls: ['../app.component.css', './registry-homepage.component.css' ],
  providers: [RegistryPackageActions]
})
export class RegistryHomeComponent {

  @select(['temp', 'packages']) allPackages$: Observable<any>;

  constructor( public _packageActions: RegistryPackageActions,
               public _router: Router,
               private _http: HttpClient
              ) {
    _packageActions.getAllPackagesAction('woohoo message fun time.');
  };
  TestService() {
    this._packageActions.createNewPackagesAction('abe');
  }

  goToPackage(id: string) {
    this._router.navigate(['/package-page/', id])
}

}
