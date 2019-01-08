import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {RegistryHomeComponent} from './registry-homepage.component';
import {MenuModule} from '../Shared/Menu/menu.module';
import {HttpClientModule} from '@angular/common/http';
import {ButtonModule} from 'primeng/button';





@NgModule({
  declarations: [
    RegistryHomeComponent
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
    RegistryHomeComponent
  ],
})
export class RegistryHomeModule {

}
