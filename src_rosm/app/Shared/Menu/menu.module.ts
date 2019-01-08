import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {MenuComponent} from './menu.component';
import {MatGridListModule, MatIconModule, MatMenuModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    InputTextModule,
    MatGridListModule,
    ButtonModule
  ],
  exports: [
    MenuComponent
  ],
})
export class MenuModule {

}
