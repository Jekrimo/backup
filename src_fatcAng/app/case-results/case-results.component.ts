// import { ApplicationInitStatus, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
// import { NgRedux } from "@angular-redux/store";
// import { FatCActions } from "../fat-c/fat-c.actions";
// import { AppActions } from "../app.actions";
// import { AppModule } from "../app.module";
// import { ActivatedRoute, Router } from "@angular/router";
// import { FormBuilder, Validators } from "@angular/forms";
// import {select} from "@angular-redux/store";
// import {Observable} from "rxjs/Observable";
//
// import {IAppState} from "../store";
//
//
// @Component({
//   selector: "app-case-results",
//   templateUrl: "./case-results.component.html",
//   styleUrls: ["./case-results.component.scss", "../app.component.css"]
// })
//
// export class CaseResultsComponent {
//
//   @select(["alerts"]) alerts$: Observable<any>;
//
//   private sub: any;
//   // may need to combine results of all case running searches into one object to create tab/pagination correctly for html side.
//   public caseResults: Array<any> = [{case: "case1", size: "1mb", attachment: "yes"},
//                                     {case: "case2", size: "123mb", attachment: "no"},
//                                     {case: "case3", size: "452mb", attachment: "yes"},
//                                     {case: "case4", size: "998mb", attachment: "yes"}];
//   public currentCase = this.state.getState().app.currentCaseID ;
//   public checkToggles = false;
//   public caseID: number;
//
//     constructor(private _fatCAction: FatCActions,
//     private route: ActivatedRoute,
//               private _appAction: AppActions,
//               private _router: Router,
//               public state: NgRedux<IAppState>,
//               ) {
//                 //  this.caseID = this.state.getState().casesInfo.currentCase.case.ID;
//                 this.sub = this.route.params.subscribe(params => {
//                   this.caseID = +params["caseID"];
//                 });
//               };
//
//   logOutUser(event) {
//     this._fatCAction.logoutOfFatCClient();
//   }
//
//   closeCaseClick() {
//     this._fatCAction.logoutOfFatCClient();
// }
//   onBackClick() {
//     this._router.navigate(["/case-run/", this.caseID ]);
//   }
//
//   toggleItem(item) {
//   item.checked = !item.checked;
//   this.checkToggles = this.caseResults.every((anotheritem) => anotheritem.checked);
// }
//   toggleAll() {
//     this.checkToggles = !this.checkToggles;
//     this.caseResults.forEach(item => item.checked = this.checkToggles);
//   }
//
// }
