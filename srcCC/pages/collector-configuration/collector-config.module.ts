import { IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CollectorConfigComponent } from "./collector-config.component";
import { AlertModule } from "ngx-bootstrap";

@NgModule({
  declarations: [
    CollectorConfigComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    HttpModule,
    IonicModule
  ],
  exports: [
    CollectorConfigComponent,
  ],
})
export class CollectorConfigModule {

}
