import { RouterModule } from '@angular/router';
import { IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HubComponent } from "./hub.component";
import { AlertModule } from "ngx-bootstrap";

@NgModule({
  declarations: [
    HubComponent
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
    HubComponent,
  ],
})
export class HubModule {

}
