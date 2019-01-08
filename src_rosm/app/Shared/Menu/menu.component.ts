
import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormBuilder } from '@angular/forms';
import 'rxjs/add/observable/combineLatest';
import {Router} from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../../app.component.css', './menu.component.css' ]
})
export class MenuComponent {


public registryTabActive = false;
public repoTabActive = false;
public docsTabActive = false;
public toolsTabActive = false;
public searchDisabled = true;
  constructor(
    public _router: Router
  ) {

    if (this._router.url === '/registry-homepage') {
      this.registryTabActive = true;
    }
    if (this._router.url === '/repository-homepage') {
      this.repoTabActive = true;
    }

    console.log('*************************************', this._router.url);
    if ( this._router.url === '/' ) {
      console.log('*************************************', this._router.url);
      this.searchDisabled = false;
    } else {
      this.searchDisabled = true;
    }

    console.log('Menu Component');
  };


}
