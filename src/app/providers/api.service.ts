import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import swal from 'sweetalert';



declare function loadingServiceShow(zindex, id, flag);
declare function loadingServiceHide(id);

 
@Injectable({
  providedIn: "root",
})
export class ApiService {
  apiUrl: string;

  private messageSource = new BehaviorSubject({ IsLoggedIn: "FALSE" });
  currentMessage = this.messageSource.asObservable();

  private PageSource = new BehaviorSubject("AppComponent"); //Page_Name
  TargetComponent = this.PageSource.asObservable();

  private RenwalTabType = new BehaviorSubject([
    { Id: "45_Days", Name: "45 Days" },
  ]);
  RenwalfilterTabType = this.RenwalTabType.asObservable();

  SiteUrl: string;
  apiUrlBms: string;
  RenewalQuery: any;
  LoadingDashboardPoupup: any = 0;
  RenewalGetTabType: any;
  SOCKET_ENDPOINT: string;
  Send_Renewal_mail_Condition: any = 0;
  apiUrlBmsBase: string;
  DataRightsNavigationValue: any = 'Default';
  DataRightsNavigationNumberValue: any = 1;
  urlSegment: any;
  currentUrl: any;
  urlSegmentRoot: any;
  urlSegmentSub: any;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router

  ) {
    console.log("API Calling..." + environment.apiUrl);
    this.apiUrl = environment.apiUrl;
    // api.service

 
    this.SiteUrl = "";

   }
 
  changeMessage(message: any) {
    this.messageSource.next(message);
  }
  changeComponent(Page: any) {
    this.PageSource.next(Page);
  }

   

  public HttpPostTypeArray(apiName, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.GetToken(),
        //'Accept':  'application/x-www-form-urlencoded',
        //'Content-Type':  'application/x-www-form-urlencoded'
      }),
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + "/" + apiName, data).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

    


  public Toast(Type, Message) {
    //var Type = 'Success';
    //var Message = 'everything is broken';
    switch (Type) {
      case "Success": {
        //statements;
        this.toastr.success(Type, Message, {
          closeButton: true,
          progressBar: true,
          progressAnimation: "increasing",
          timeOut: 3000,
        });
        break;
      }
      case "Notification": {
        //statements;
        this.toastr.success(Type, Message, {
          closeButton: true,
          progressBar: true,
          progressAnimation: "increasing",
          timeOut: 3000,
        });
        break;
      }
      case "Error": {
        //statements;
        this.toastr.error(Type, Message, {
          closeButton: true,
          progressBar: true,
          progressAnimation: "increasing",
          timeOut: 3000,
        });
        break;
      }
      case "Info": {
        //statements;
        this.toastr.info(Type, Message, {
          closeButton: true,
          progressBar: true,
          progressAnimation: "increasing",
          timeOut: 3000,
        });
        break;
      }
      case "Warning": {
        //statements;
        this.toastr.warning(Type, Message, {
          closeButton: true,
          progressBar: true,
          progressAnimation: "increasing",
          timeOut: 3000,
        });
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  public IsLoading() {
    this.spinner.show();
  }
  public HideLoading() {
    this.spinner.hide();
  }


  public HttpPostType(apiName, data) {

    

    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': this.GetToken(),
        'Access-Control-Allow-Origin': '*',

      }),
    };

    var Returns = new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + "/" + apiName, data).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });

    Returns.then(async (res) => {

      if (res['Status'] && res['Status'] == 'TokenError') {

        this.Toast('Warning', res['Msg']);

 
         

        return false;
      }

    });

    return Returns;
  }


  public HttpPostTypeLogin(apiName, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + "/" + apiName, data).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public HttpGetType(apiName) {
  
    var Returns = new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + "/" + apiName  ).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });

    Returns.then( async (res) => {

      if (res['Status'] && res['Status'] == 'TokenError') {

        this.Toast('Warning', res['Msg']);

 
          this.router.navigate(['Logoutweb']);
         
        return false;
      }

    });


    return Returns;

    //yaha tak

  }
 
  public GetToken() {
    //console.log(localStorage.getItem('Logged_In') + '-Test');
    const data = localStorage.getItem("Logged_In");
    if (data != null) {
      if (data == "FALSE") {
        return "FALSE";
      } else {
        return localStorage.getItem("Token");
      }
    } else {
      return "FALSE";
    }
  } 

  public StandrdToDDMMYYY(d) {
    return d;
    console.log(d);
    console.log(new Date(d));
    if (d == "" || d == null || d == "00-00-0000") {
      return "";
    } else {
      d = new Date(d);
      return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); // + ' '+d.toString().split(' ')[4];
      //return d.getDate() + "-"+(d.getMonth()+1) +"-"+d.getFullYear();
      // for time part you may wish to refer http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
    }
  }

    

 

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });

  }











 
  callme(Id) {
    loadingServiceShow(1, Id, false);
  }

  //===== HIDE DIV LOADER =====//
  callmestop(Id) {
    loadingServiceHide(Id);
  }

}
