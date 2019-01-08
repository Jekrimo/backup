import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";
import { AuthenticateModalComponent } from "./authenticate-modal.component";
import { FormsModule } from "@angular/forms";
import { TooltipModule } from "ngx-bootstrap";

@NgModule({
  declarations: [
    AuthenticateModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    ModalModule.forRoot(),
    FormsModule,
    TooltipModule.forRoot()
  ],
  exports: [
    AuthenticateModalComponent
  ],
})
export class AuthenticateModalModule {

}
