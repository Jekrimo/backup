import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {MenuModule} from '../Shared/Menu/menu.module';
import {HttpClientModule} from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import {PackagePageComponent} from './package-page.component';





@NgModule({
  declarations: [
    PackagePageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MenuModule,
    ButtonModule
  ],
  exports: [
    PackagePageComponent
  ],
})
export class PackagePageModule {

}
