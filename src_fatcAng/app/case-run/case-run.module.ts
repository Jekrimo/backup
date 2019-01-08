import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BannerModule } from "../shared/banner/banner.module";
import { CaseRunComponent } from "./case-run.component";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@NgModule({
  declarations: [
    CaseRunComponent
  ],
  imports: [
    CommonModule,
    BannerModule
  ],
  exports: [
    CaseRunComponent
  ],
})
export class CaseRunModule {

}
