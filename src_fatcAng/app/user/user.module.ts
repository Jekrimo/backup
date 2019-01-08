import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserComponent } from "./user.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BannerModule } from "../shared/banner/banner.module";
import { TooltipModule } from "ngx-bootstrap";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    BannerModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TooltipModule.forRoot()
  ],
  exports: [
    UserComponent
  ],
})
export class UserModule {

}
