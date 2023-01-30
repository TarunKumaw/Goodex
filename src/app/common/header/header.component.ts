import { Component, HostListener, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../providers/api.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import $ from "jquery";
declare var jQuery: any;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  name = "Angular";
  CountNotifications: any = 0;
  NotificationsAr: any = [];
  myWindow: any;
  LoginUserId: any = 0;
  HeaderStatus: number = 0;
  HeaderLifeTrainngLabel: any = "Start to Life Training";
  LoginType: string;
  PosStatus: any;
  Life_Training_Status: any;
  UserTypesView: string;
  ChangePassword: any;
  GemsStatus: any;
  PrimeStatus: any;
  currentUrl: any;
  urlSegment: string;
  urlSegmentRoot: any;
  urlSegmentId: any;
  urlSegmentSub: any;
  CopyPasteRights: number;
  LoginId: any;
  FetchData: any;
  RmData: any;
  TeleRmData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    public api: ApiService,
    //public socketService : SocketioService,
    public dialog: MatDialog,

    private router: Router
  ) {}

  ngOnInit() {}

  ShowLoginPoupup() {
    $(".main_popup").toggleClass("is_visible");
  }

  ShowMobilePoupup() {
    $("#navbarSupportedContent").removeClass("show");
  }
}
