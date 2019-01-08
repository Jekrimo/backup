import { LoginModal } from './login-modal.component';
import { IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertModule } from "ngx-bootstrap";

@NgModule({
  declarations: [
    LoginModal
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    IonicModule
  ],
  exports: [
    LoginModal
  ],
})
export class LoginModule {

}
