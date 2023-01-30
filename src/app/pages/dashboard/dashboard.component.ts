import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { ApiService } from "../../providers/api.service";
import { Router, ActivatedRoute } from "@angular/router";

import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
} from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
 
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})


export class DashboardComponent implements OnInit {
  Dataarr: any = [];
  dataResult: any = [];
  DashboardValue: any = [];
  UnderTrainingAgentResult: any = [];
  AgentTrainingType: any = [];
  Dataarr1: any;
  DashboardValue1: any;
  LoginType: string;
  Life_Training_Status: any;
  PosStatus: string;
  FetchData: any;
  RmData: any;
  TeleRmData: any;
  LoginId: any;
  // title = 'owlcarouselinAngular';  
  // Images = ['../assets/images/home_page/profile.png', '../assets/images/home_page/profile.png', '../assets/images/home_page/profile.png'];  
   CurrentUrl: string;

  constructor(
    public api: ApiService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    
  ) {
    this.CurrentUrl = window.location.pathname;
  }

  ngOnInit() {
    console.log(this.CurrentUrl);
    this.loadScript();
   }  


   loadScript() {

    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
            isFound = true;
        }
    }
    
    if (this.CurrentUrl == '/') {
        var dynamicScripts = [                  
                  "assets/js/main.js",
          ];

        for (var i = 0; i < dynamicScripts.length; i++) {
            let node = document.createElement('script');
            node.src = dynamicScripts [i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('body')[0].appendChild(node);
        }
    } 
  }
}