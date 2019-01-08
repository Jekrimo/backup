import { UserAuthModalModule } from "./user-auth-modal/user-auth-modal.module";
import { ModalModule } from "ngx-bootstrap/modal";
import { EditUserModalModule } from "./edit-user-modal/edit-user-modal.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { BannerModule } from "../shared/banner/banner.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    BannerModule,
    FormsModule,
    EditUserModalModule,
    UserAuthModalModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports: [
    AdminComponent
  ],
})
export class AdminModule {
}
