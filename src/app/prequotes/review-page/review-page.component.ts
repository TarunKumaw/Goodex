import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../providers/api.service";
@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {
  urlSegment: any;
  dataArValue:any= [];
  logo: any;
  CheckedValidation: FormGroup;
  isSubmitted: any= false;
  Section: number = 1;
  ApiResponse: any =  [];


  constructor(public api: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
   
    var splitted = this.router.url.split("/");
    if (typeof splitted[1] != "undefined") {
      this.urlSegment = splitted[2];
    }

    this.CheckedValidation = this.formBuilder.group({
      declaration: ["", Validators.required],
    });
  
   }

  ngOnInit() {

    this.GetQuoteDetails();

  }

  ShowEditClose() {
    $("#review_modal").removeClass("is_visible");
  }

 
  UpdateData(url="") {

    const formData = new FormData();

    this.isSubmitted = true;
       if (this.CheckedValidation.invalid) {
         return;
       } else {
        
      //   this.api.IsLoading();
      //   this.api.HttpPostType("PaymentSet/fetch_details", formData).then(
      //     (result) => {
      //       console.log(result);
      //       this.api.HideLoading();
      //     this.dataArValue = result['Data'];
      //     this.logo = result['logo'];
             
      //     // $("#review_modal").toggleClass("is_visible"); 
      //      }
      // );

      window.location.href=url;
        

       }
  }

  get formControls1() {
    return this.CheckedValidation.controls;
  }

  GetQuoteDetails() {
    const formData = new FormData();
    const quoteId = this.urlSegment;

    console.log(quoteId);
    formData.append("quoteId", this.urlSegment);
    
    this.api.IsLoading();
        this.api.HttpPostType("Review_pay/fetch_details", formData).then(
          (result) => {
            console.log(result);
            this.api.HideLoading();
          this.dataArValue = result['Data'];
          this.logo = result['logo'];
             
          // $("#review_modal").toggleClass("is_visible"); 
           
       
          }
      
        );
    
    }

    ShowHideFunction(Section){
      this.Section=Section;
    }


    backButton(company:any,qid:any){
      this.router.navigateByUrl("/proposal/" + company + "/" + qid);
    }

    
  GetProposalApi() {
    const formData = new FormData();
    const quoteId = this.urlSegment;

    // console.log(quoteId);
    formData.append("quoteId", this.urlSegment);
    
    this.api.IsLoading();
        this.api.HttpPostType("Review_pay/index", formData).then(
          (result) => {
            this.api.HideLoading();
          this.ApiResponse = result['Data'];
                 console.log(this.ApiResponse);
                 $("#review_modal").toggleClass("is_visible");       
       
          }
      
        );
    
    }


}
