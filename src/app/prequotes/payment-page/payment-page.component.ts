import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../providers/api.service";

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  urlSegment: any;
  dataArValue: any;
  logo: any;
  status: string;
  quotation: string;
  constructor(public api: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
   
    var splitted = this.router.url.split("/");
    if (typeof splitted[1] != "undefined") {
      this.status = splitted[2];
      this.quotation = splitted[3];
    }

    
  
   }

  ngOnInit() {
    this.GetQuoteDetails();
  }


  GetQuoteDetails() {
    const formData = new FormData();
    const quoteId = this.urlSegment;

    console.log(quoteId);
    formData.append("quoteId", this.quotation);
    formData.append("statue", this.status);
    
    this.api.IsLoading();
        this.api.HttpPostType("Payment/fetch_details", formData).then(
          (result) => {
            console.log(result);
            this.api.HideLoading();
          this.dataArValue = result['Data'];
          
             
          // $("#review_modal").toggleClass("is_visible"); 
           
       
          }  
      
        );
    
    }

}
