
import { Component } from '@angular/core';
// import { FormBuilder } from '@angular/forms';
import 'rxjs/add/observable/combineLatest';
import {HomeActions} from './home.actions';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginModalComponent} from '../rosm-login-modal/login-modal.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css', './home.component.scss' ],
  providers: [HomeActions]
})
export class HomeComponent {

  public searchDisabled = true;

  public imageSources: string[] = [
    'assets/img/temp_slider01.png',
    'assets/img/temp_slider02.png',
    'assets/img/temp_slider03.png',
  ];
  constructor( _testAction: HomeActions,
              public _router: Router,
               public modalService: NgbModal
              ) {
    _testAction.testRedux('woohoo message fun time.');
    console.log('Home Component');
  };
  public nextPage() {
    this._router.navigate(['/registry-homepage']);
  }
  loginModal() {
  this.modalService.open(LoginModalComponent)
  }
}
