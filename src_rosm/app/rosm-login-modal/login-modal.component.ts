
import { Component } from '@angular/core';
import 'rxjs/add/observable/combineLatest';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, NgForm} from '@angular/forms';
import {UserActions} from '../users/users.actions';
import {UserServices} from '../users/users.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['../app.component.css' ],
  providers: [FormBuilder, UserActions, UserServices]
})
export class LoginModalComponent {
  constructor(
              public _userActions: UserActions,
              private Route: Router,
              public activeModal: NgbActiveModal,
              ) {

  }

  // used for x close icon at top right of the modal
  closeModal() {
    this.activeModal.dismiss()
  }

    // submit user credentials to server for us/pw check
  submitCredentials(formData: NgForm) {
    this._userActions.loginUserAction(formData.value).then((somethingback) => {
      console.log(somethingback, 'something back right herer &&&&&&&&');
      this.Route.navigate(['/registry-homepage']);
    }).catch(error => {console.log(error, 'eoror hereesssssss')})
    // this.Route.navigate(['registry-homepage']);
    this.activeModal.dismiss()
  }
}
