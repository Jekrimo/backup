
import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormBuilder } from '@angular/forms';
import 'rxjs/add/observable/combineLatest';
import {RepositoryHomeActions} from './repository-homepage.actions';


@Component({
  selector: 'app-internal-home',
  templateUrl: './repository-homepage.component.html',
  styleUrls: ['../app.component.css', './repository-homepage.component.css' ],
  providers: [RepositoryHomeActions]
})
export class RepositoryHomeComponent {

 public tempPackages: any = [
   {'type': 'a',
     'discription' : 'Nam suas fugit persequeris te. At mel rebum hendrerit'},
   {'type': 'b',
     'discription' : 'NExerci aliquando at mei.'},
   {'type': 'c',
     'discription' : 'At mel rebum hendrerit, cu sea doming gloriatur '},
   {'type': 'd',
     'discription' : 'Cum amet etiam quidam ne. '},
   {'type': 'e',
     'discription' : 'Vim putent scripserit in, civibus '},
 ]

  constructor( _testAction: RepositoryHomeActions
              ) {
    _testAction.testRedux('woohoo message fun time.');
    console.log('Internal yo!!!!');
  };


}
