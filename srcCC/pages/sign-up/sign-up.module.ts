import { RouterModule } from '@angular/router';
import { IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertModule } from "ngx-bootstrap";

import { SignUpComponent} from "./sign-up.component"

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    IonicModule
  ],
  exports: [
    SignUpComponent,
  ],
})
export class SignUpModule {

}
