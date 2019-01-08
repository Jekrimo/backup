import { Component } from '@angular/core';
import {HomeActions} from './rosm-homepage/home.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
  ]
})
export class AppComponent {
  title = 'app works!';

  constructor( _testAction: HomeActions,
               public _router: Router
  ) {
  }
}
