import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {HomeComponent} from './home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {HttpClientModule} from '@angular/common/http';
import {ButtonsModule, CarouselModule} from 'ngx-bootstrap';




@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CarouselModule,
    ButtonsModule,
    NgbModule.forRoot(),
    ButtonModule
  ],
  exports: [
    HomeComponent
  ],
})
export class HomeModule {

}
