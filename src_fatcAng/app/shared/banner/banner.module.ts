import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {BannerComponent} from "./banner.component";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@NgModule({
  declarations: [
    BannerComponent
  ],
  imports: [
      CommonModule
  ],
  exports: [
    BannerComponent
  ],
})
export class BannerModule {
}
