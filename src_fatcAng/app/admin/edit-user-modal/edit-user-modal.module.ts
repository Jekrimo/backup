import { UserAuthModalModule } from "../user-auth-modal/user-auth-modal.module"
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";
import { EditUserModalComponent } from "./edit-user-modal.component";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@NgModule({
  declarations: [
    EditUserModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    UserAuthModalModule,
    ModalModule.forRoot()
  ],
  exports: [
    EditUserModalComponent
  ],
})
export class EditUserModalModule {

}
