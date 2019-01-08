import {Injectable} from '@angular/core';
import {AjaxTrio} from '../Shared/ajaxTrio.class';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../store';
import {PackageServices} from './package.service';
import {IPackageInfo} from '../Shared/data.dto';

@Injectable()
export class RegistryPackageActions {

  static GET_ALL_PACKAGES_AJAX_TRIO = new AjaxTrio(
    'GET_ALL_PACKAGES_AJAX_TRIO',
    'trying to get all packages...',
    'Successfully got all packages!',
    'error getting all packages'
  );

  static CREATE_NEW_PACKAGE_AJAX_TRIO = new AjaxTrio(
    'CREATE_NEW_PACKAGE_AJAX_TRIO',
    'trying to create new package...',
    'Successfully created new package!',
    'error creating new package'
  );

  static GET_PACKAGE_BY_ID_AJAX_TRIO = new AjaxTrio(
    'GET_PACKAGE_BY_ID_AJAX_TRIO',
    'trying to get package...',
    'Successfully got package!',
    'error getting package'
  );
  public currentPackageTemp: IPackageInfo;
  public tempPackages: any =  [
      {
        'id': 'a',
        'description': 'Nam suas fugit persequeris te. At mel rebum hendrerit',
        'author': 'Jim Kenci',
        'date': Date.now()
      },
      {
        'id': 'b',
        'description': 'NExerci aliquando at mei.',
        'author': 'Jim Kenci',
        'date': Date.now()
      },
      {
        'id': 'c',
        'description': 'At mel rebum hendrerit, cu sea doming gloriatur ',
        'author': 'Jim Kenci',
        'date': Date.now()
      },
      {
        'id': 'd',
        'description': 'Cum amet etiam quidam ne. ',
        'author': 'Jim Kenci',
        'date': Date.now()
      },
      {
        'id': 'e',
        'description': 'Vim putent scripserit in, civibus ',
        'author': 'Jim Kenci',
        'date': Date.now()
      },
    ]

  constructor(private _ngRedux: NgRedux<IAppState>,
              private _packageservices: PackageServices) {

  }

  // Retrieve all available packages hosted by Ros-m
  getAllPackagesAction(message: string): any {
    console.log(message);
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      RegistryPackageActions.GET_ALL_PACKAGES_AJAX_TRIO);

    return this._packageservices.getAllPackages('abc')
      .then((allPackages) => {
        console.log(allPackages);
        AjaxTrio.dispatchSuccessAction(this._ngRedux, RegistryPackageActions.GET_ALL_PACKAGES_AJAX_TRIO, { allPackages });
      })
      .catch(error => {
        const packages = this.tempPackages;
        AjaxTrio.dispatchSuccessAction(this._ngRedux, RegistryPackageActions.GET_ALL_PACKAGES_AJAX_TRIO, { packages });
        AjaxTrio.dispatchErrorAction(this._ngRedux, RegistryPackageActions.GET_ALL_PACKAGES_AJAX_TRIO, error);
      });
  }

  createNewPackagesAction(message: string) {
    console.log(message);
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      RegistryPackageActions.CREATE_NEW_PACKAGE_AJAX_TRIO);

    this._packageservices.getPackageByID('')
      .then((success) => {
        console.log(success);
        AjaxTrio.dispatchSuccessAction(this._ngRedux, RegistryPackageActions.CREATE_NEW_PACKAGE_AJAX_TRIO, { success });
      })
      .catch(error => {
        console.log('adsfasdfasdfasdf', error);
        AjaxTrio.dispatchErrorAction(this._ngRedux, RegistryPackageActions.CREATE_NEW_PACKAGE_AJAX_TRIO, error);
      });
  }

  // Retrieve a single package and it's metadata by searching it's ID
  getPackageByIDAction(packageID: string) {
    console.log(packageID);
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      RegistryPackageActions.GET_PACKAGE_BY_ID_AJAX_TRIO);

    this._packageservices.getPackageByID(packageID)
      .then((currentpackage) => {
        // below is temp until services are created.
        this.tempPackages.forEach((packageLoop) => {
          for (let onePackage of packageLoop) {
            if (packageID === onePackage.id) {
              this.currentPackageTemp = onePackage;
              return this.currentPackageTemp;
            }
          }
          // Need to make a call to grab all packages for browser reload issue.
        })
        AjaxTrio.dispatchSuccessAction(this._ngRedux, RegistryPackageActions.GET_PACKAGE_BY_ID_AJAX_TRIO,
          { currentPackage: currentpackage });
      })
      .catch(error => {
        // below is temp until services are created.
        this.tempPackages.forEach((packageLoop) => {
          for (let onePackage of packageLoop) {
            if (packageID === onePackage.id) {
              console.log(onePackage)
              this.currentPackageTemp = onePackage;
              return this.currentPackageTemp;
            }
          }
          // Need to make a call to grab all packages for browser reload issue.
        })
        console.log(this.currentPackageTemp);
        AjaxTrio.dispatchSuccessAction(this._ngRedux, RegistryPackageActions.GET_PACKAGE_BY_ID_AJAX_TRIO,
          { 'currentPackage': this.currentPackageTemp });
        AjaxTrio.dispatchErrorAction(this._ngRedux, RegistryPackageActions.GET_PACKAGE_BY_ID_AJAX_TRIO, error);
      });
  }
}
