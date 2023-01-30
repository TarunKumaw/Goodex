import { Component, HostListener } from "@angular/core";

import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { ApiService } from "./providers/api.service";
 
 import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
   message;

  IsLoggedIn: string = "FALSE";
  LoginUserId: any = 0;
  interval: any;
  CurrentUrl: string;
  windownPoupupstatus: any = 0;
  currentRoute: string;
  // currentUrl1: string;
  urlSegment: any;
  urlSegmentRoot: any;
  urlSegmentSub: any;

  constructor(
    public dialog: MatDialog,
    public api: ApiService,
  
    private router: Router
  ) {
    this.CurrentUrl = window.location.pathname;

    // if (this.CurrentUrl == "/") this.router.navigate([""]);
  }

  @HostListener("document:click", ["$event"])
  handleClick(event: Event) {
    var splitted = this.router.url.split("/");
    if (typeof splitted[1] != "undefined") {
      this.urlSegment = splitted[1];
    }
  }

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode == 44) {
      return false;
    }
  }

  ngOnInit() {
    this.UpdateBodyClass();
    console.log(this.CurrentUrl); 
  }

  UpdateBodyClass() {
    const body = document.getElementsByTagName("body")[0];
    //console.log(body);
    if (this.IsLoggedIn == "TRUE") {
      body.classList.remove("login-page");
      body.classList.add(
        "hold-transition",
        "skin-blue",
        "sidebar-mini",
        "skin-black-light"
      );
    } else {
      body.classList.remove("skin-blue", "sidebar-mini");
      body.classList.add("hold-transition", "login-page");
    }
  }
}
