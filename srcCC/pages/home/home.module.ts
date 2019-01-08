import { RouterModule } from '@angular/router';
import { IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home.component";
import { AlertModule } from "ngx-bootstrap";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    AlertModule.forRoot(),
    HttpModule,
    IonicModule
  ],
  exports: [
    HomeComponent,
  ],
})
export class HomeModule {

}
