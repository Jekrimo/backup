import {Component, ViewChild, Output, EventEmitter} from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import {
  IAuthorization,
  ICollectorTypes
} from "../data.dto";

// fb is from facebook api script tag
declare const FB: any;
@Component({
  selector: "app-auth-modal",
  templateUrl: "./authenticate-modal.component.html",
  styleUrls: ["./authenticate-modal.component.scss", "../../app.component.css"]
})
/**
 * Authenticate modal component
 * @author Shaun Shepherd (sshepherd@ara.com)
 * @description Contains the logic for the modal
 */
export class AuthenticateModalComponent {
  @ViewChild("authModal") public authModal: ModalDirective;
  @Output() newAuth: EventEmitter<IAuthorization> = new EventEmitter<IAuthorization>();
  public authRequestID: string;
  public authURL: string;
  public isFacebook: boolean;
  public facebookCollector: ICollectorTypes;
  // Stores the auth value
  public authValue: string;
  public targetUsername: string;
  public targetPassword: string;

  /**
   * Show the authenticate modal
   *
   * @memberOf AuthenticateModalComponent
   */
  public ShowAuthModal() {
    this.targetPassword = this.targetUsername = this.authValue = "";
    this.authModal.show();
  }
  /**
   * Hide the authenticate modal
   *
   * @memberOf AuthenticateModalComponent
   */
  public HideAuthModal() {
    this.targetPassword = this.targetUsername = this.authValue = "";
    this.authModal.hide();
  }
  /**
   *  Save the authentication code
   * @memberOf AuthenticateModalComponent
   */
  public SaveAuthenticateCode() {
    // Pass the auth values up to the parent
    this.newAuth.emit({
      username: this.targetUsername,
      password: this.targetPassword,
      authCode: this.authValue,
      authRequestID: this.authRequestID,
    });
    this.HideAuthModal();
  }

  /**
   * Authenticate code change handler
   *
   * @memberOf AuthenticateModalComponent
   */
  public Navigate() {
    if (!this.isFacebook) {
      window.open(this.authURL);
    } else {
      // facebook is special snowflake that requires you use their api to open
      // an unexposed URL
      FB.login((result: any) => {
        if (result.authResponse) {
          this.authValue = result.authResponse.accessToken;
        } else {
          alert("didn't receive a valid authorization response from facebook");
        }
      });
    }
  }

  getAuthTooltip(): string {
    if (!this.targetUsername || !this.targetPassword) {
      return "Enter target username and password for storage before authenticating";
    }
    if (!this.authValue) {
      return "Enter received authentication code from 3rd party website login before saving authentication";
    }
    return "";
  }

  isAuthButtonDisabled() {
    return !this.targetPassword || !this.targetUsername || !this.authValue;
  }
}
