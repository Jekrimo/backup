
import {Component, OnInit} from '@angular/core';
// import { Router } from '@angular/router';
// import { FormBuilder } from '@angular/forms';
import 'rxjs/add/observable/combineLatest';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs/Observable';
import {IPackageInfo} from '../Shared/data.dto';
import {ActivatedRoute, Router} from '@angular/router';
import {RegistryPackageActions} from '../packages/package.actions';


@Component({
  selector: 'app-package-page',
  templateUrl: './package-page.component.html',
  styleUrls: ['../app.component.css', './package-page.component.css' ],
  providers: [RegistryPackageActions]
})
export class PackagePageComponent implements OnInit {
  @select(['temp', 'packages']) allPackages$: Observable<IPackageInfo[]>;
  public tempPackages: IPackageInfo[];
  public currentPackage: any;
  public packageID: string;

  constructor( public _router: Router,
               private route: ActivatedRoute,
               public _packageActions: RegistryPackageActions,
  ) {

    this.route.params.subscribe(params => {
      this.packageID = params['packageID'];
    });
    this.allPackages$.subscribe(value => {
      this.tempPackages = value;
    });
    this.allPackages$.forEach((packageLoop) => {
      for (let onePackage of packageLoop) {
        if (this.packageID === onePackage.id) {
            this.currentPackage = onePackage;
            return this.currentPackage;
          }
      }
      // Need to make a call to grab all packages for browser reload issue.
    })
    this._packageActions.getAllPackagesAction('woohoo message fun time.')
      this._packageActions.getPackageByIDAction(this.packageID);
  };
  public ngOnInit() {
    // this._packageActions.getAllPackagesAction('woohoo message fun time.').then(() => {
    //   this._packageActions.getPackageByIDAction(this.packageID);
    // });
  }

}
