// import {Injectable} from "@angular/core";
// import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
// import {NgRedux} from "@angular-redux/store";
// import {IAppState} from "../state/store";
// import {getCookie} from "./cookie-util";

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router,
//               private _ngRedux: NgRedux<IAppState>) {
//   }

//   canActivate(route: ActivatedRouteSnapshot, routestate: RouterStateSnapshot) {
//       const loginCookie = getCookie("login");
//       if (loginCookie) {
//         return true;
//       }
//       // not logged in so redirect to login page with the return url
//       this.router.navigate(["/"], {queryParams: {returnUrl: routestate.url}});
//       return false;
//   }
// }
