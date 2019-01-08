import {Injectable} from "@angular/core";
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {NgRedux} from "@angular-redux/store";
import {IAppState} from "../store";
import {getCookie} from "./cookie-util";

///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private _ngRedux: NgRedux<IAppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, routestate: RouterStateSnapshot) {
      const loginCookie = getCookie("login");
      if (loginCookie) {
        return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(["/"], {queryParams: {returnUrl: routestate.url}});
      return false;
  }
}
