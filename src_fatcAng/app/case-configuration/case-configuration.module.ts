import { TooltipModule } from "ngx-bootstrap";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CaseConfigurationComponent } from "./case-configuration.component";
import { BannerModule } from "../shared/banner/banner.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthenticateModalModule } from "../shared/authenticate-modal/authenticate-modal.module";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@NgModule({
  declarations: [
    CaseConfigurationComponent
  ],
  imports: [
    CommonModule,
    BannerModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticateModalModule,
    TooltipModule.forRoot(),
  ],
  exports: [
    CaseConfigurationComponent
  ],
})
export class CaseConfigurationModule {
}
