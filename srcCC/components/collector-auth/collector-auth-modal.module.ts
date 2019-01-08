import { RouterModule } from '@angular/router';
import { CollectorAuthModal } from './collector-auth-modal.component';
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
    CollectorAuthModal
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    IonicModule
  ],
  exports: [
    CollectorAuthModal
  ],
})
export class CollectorAuthModule {

}
