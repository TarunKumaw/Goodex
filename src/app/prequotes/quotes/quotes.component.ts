import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../providers/api.service";
import $ from "jquery";

type NewType = any;

@Component({
  selector: "app-quotes",
  templateUrl: "./quotes.component.html",
  styleUrls: ["./quotes.component.css"],
})
export class QuotesComponent implements OnInit {
  urlSegment: any;
  dataAr: any;
  companyArr: any[];
  SelectRto: [];
  dropdownSettingsingleselect: {
    singleSelection: boolean;
    idField: string;
    textField: string;
    itemsShowLimit: number;
    enableCheckAll: boolean;
    allowSearchFilter: boolean;
  };
  make: any;
  isShowDiv = false;
  isShowDivAddon = false;
  isShowDivAdditional = false;
  isShowDivVoluntary = false;
  updateForm: FormGroup;
  dataArValue: any;
  isSubmitted: boolean;
  updateRegistrationDate: FormGroup;
  updatePurchaseDate: FormGroup;
  updateRegistrationRTO: FormGroup;
  SelectMake: [];
  SearchTerm: any;
  RtoName: any[];
  MakeName: any[];
  updateMakeModal: FormGroup;
  SelectModal: any[];
  ModalName: any[];
  quoteArray: [];
  FuelName: any[];
  VariantName: any[];
  SearchVariant: any[];
  SearchFule: any[];
  rt: void;
  companyArr1: string[];
  post: Array<any> = [];
  responseData: any;
  type: any;
  dataArVal: any;
  SelectPreviousInsurer: any;
  updateThirdParty: any;
  // SearchMa: any[];
  // updateRegistrationDate: FormGroup;

  constructor(
    public api: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.dropdownSettingsingleselect = {
      singleSelection: true,
      idField: "Id",
      textField: "Name",
      itemsShowLimit: 2,
      enableCheckAll: false,
      allowSearchFilter: true,
    };

    this.updateForm = this.formBuilder.group({
      tp_only: [""],
      policy_expiery_date: [""],
      vehicle_owned_by: [""],
      zero_dept_expiring_policy: [""],
      claim_expiring_policy: [""],
      ncb_old: [""],
      anti_theft_device: [""],
      tppd_restricted_to: [""],
      vehicle_modified_for_handicap: [""],
      voluntary_excess: [""],
      voluntary_excess_value: [""],
      member_of_aai: [""],
      pa_cover: [""],
      electrical_accessory: [""],
      electrical_accessory_value: [""],
      non_electrical_accessory: [""],
      non_electrical_accessory_value: [""],
      fule_kit: [""],
      fule_kit_value: [""],
      pacoverfor_unnamed_person: [""],
      legal_liability_employee: [""],
      legal_liability_employee_value: [""],
      legal_liability_paid_driver: [""],
      fiber_glass_fuel_tank: [""],
      emergency_cover: [""],
      zero_dept: [""],
      consumables: [""],
      tyre_cover: [""],
      ncb_protection: [""],
      engine_protector: [""],
      return_invoice: [""],
      loss_of_key: [""],
      road_side_assistance: [""],
      passenger_assist_cover: [""],
      hospital_cash_cover: [""],
      loss_personal_belonging: [""],
      puc: [""],
    });
    this.updateRegistrationDate = this.formBuilder.group({
      registration_date: [""],
    });
    this.updatePurchaseDate = this.formBuilder.group({
      purchase_date: [""],
    });
    this.updateRegistrationRTO = this.formBuilder.group({
      registration_no: [""],
    });

    this.updateMakeModal = this.formBuilder.group({
      gadi_type: [""],
      make: ["", Validators.required],
      model: ["", Validators.required],
      fuel_type: ["", Validators.required],
      variant: ["", Validators.required],
    });

    this.updateThirdParty = this.formBuilder.group({
      tp_expire_policy_number: ["", Validators.required],
      tp_expire_policy_cpmpany: ["", Validators.required],
      tp_policy_expire_date: ["", Validators.required],
    });

    // this.updateRegistrationDate = this.formBuilder.group({
    //   registration_date: [""],
    // });
    var splitted = this.router.url.split("/");
    if (typeof splitted[1] != "undefined") {
      this.urlSegment = splitted[3];
    }
    // console.log(this.urlSegment)
  }

  ngOnInit() {
    this.GetQuoteDetails(1);
    this.GetRto("");
    this.GetMakeSearch("");
    this.GetModalSearch("");
    this.GetFuelSearch("");
    this.GetVariantSearch("");
    this.NewFunction();
    this.GetPreviousInsurer();
  }



  ShowLoginPoupup() {
    $("#edit_vehical_details_popup").toggleClass("is_visible");
  }

  ownDamagePoupup() {
    $("#third_party_details").toggleClass("is_visible");
  }

  ownDamageClose(type) {
    this.updateForm.get('tp_only').setValue(type);
    $("#third_party_details").removeClass("is_visible");
  }

  PremiumBreckup(i) {
    $("#premium_break" + i).toggleClass("is_visible");
  }
  PremiumBreckupClose(i) {
    $("#premium_break" + i).removeClass("is_visible");
  }
  ShowEditClose() {
    $("#edit_vehical_details_popup").removeClass("is_visible");
  }

  ShowMobilePoupup(e) {
    $(e).removeClass("show");
  }

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }
  toggleDisplayDivAdditional() {
    this.isShowDivAdditional = !this.isShowDivAdditional;
  }
  toggleDisplayDivAddon() {
    this.isShowDivAddon = !this.isShowDivAddon;
  }
  toggleDisplayvoluntary() {
    this.isShowDivVoluntary = !this.isShowDivVoluntary;
  }

  // UpdateDetails

  UpdateDetails(
    pa,
    company,
    qid,
    od,
    tp,
    premium,
    end_date,
    idv,
    tennure,
    net,
    tax,
    start_date,
    other_tp,
    tppd
  ) {
    const formData = new FormData();

    formData.append("pa", pa);
    formData.append("company", company);
    formData.append("qid", qid);
    formData.append("od", od);
    formData.append("tp", tp);
    formData.append("premium", premium);
    formData.append("end_date", end_date);
    formData.append("idv", idv);
    formData.append("tennure", tennure);
    formData.append("tax", tax);
    formData.append("start_date", start_date);
    formData.append("other_tp", other_tp);
    formData.append("tppd", tppd);
    formData.append("net", net);

    this.api.IsLoading();
    this.api.HttpPostType("Proposal/update_premium", formData).then(
      (result) => {
        console.log(result);
        if (result["Status"] == true) {
          this.router.navigateByUrl("/proposal/" + company + "/" + qid);
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
               

      },
      (err) => {
       
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  // $("#slide_option").on("click", function(a) {
  // $(".slide_btn").toggleClass("active");
  // $(this).find(".svg-inline--fa").removeClass("fa-chevron-down");
  // $(this).find(".svg-inline--fa").toggleClass("fa-chevron-down fa-chevron-up");
  // });

  GetRto(SearchTerm: any) {
    const formData = new FormData();
    SearchTerm1 = "";

    if (SearchTerm != "") {
      const Searchvalue = SearchTerm.target.value;
      if (Searchvalue != "") {
        var SearchTerm1 = Searchvalue;
      }
    }
    formData.append("quoteId", this.urlSegment);

    formData.append("SearchRto", SearchTerm1);

    // this.api.IsLoading();
    this.api.HttpPostType("Prequotes/show_rto", formData).then(
      (result) => {
        // 

        if (result["Status"] == true) {
          if (result["Data"] != "") {
            this.SelectRto = result["Data"];
            this.RtoName = result["type"];
          }
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // 
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  GetPreviousInsurer() {
    const formData = new FormData();

    formData.append("type", this.urlSegment);

    // this.api.IsLoading();
    this.api.HttpPostType("Prequotes/get_insurer", formData).then(
      (result) => {
        // 

        console.log(result);
        if (result["Status"] == true) {
          if (result["Data"] != "") {
            this.SelectPreviousInsurer = result["Data"];
          }
          console.log(this.items);
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // 
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }
  items(items: any) {
    throw new Error("Method not implemented.");
  }

  GetMakeSearch(SearchTerm: any) {
    const formData = new FormData();
    SearchTerm1 = "";

    if (SearchTerm != "") {
      const Searchvalue = SearchTerm.target.value;
      if (Searchvalue != "") {
        var SearchTerm1 = Searchvalue;
      }
    }
    formData.append("quoteId", this.urlSegment);

    formData.append("SearchMake", SearchTerm1);

    // this.api.IsLoading();
    this.api.HttpPostType("Prequotes/show_make", formData).then(
      (result) => {
        // 

        if (result["Status"] == true) {
          if (result["Data"] != "") {
            // console.log(result['type']);

            this.SelectMake = result["Data"];
            this.MakeName = result["type"];
          }
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // 
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  GetModalSearch(SearchTerm: any) {
    const formData = new FormData();
    SearchTerm1 = "";
    const SearchMa = this.updateMakeModal.get("make").value;

    const fieldsMake = this.updateMakeModal.value;

    if (SearchTerm != "") {
      const Searchvalue = SearchTerm.target.value;
      if (Searchvalue != "") {
        var SearchTerm1 = Searchvalue;
      }
    }
    formData.append("quoteId", this.urlSegment);

    formData.append("SearchModal", SearchTerm1);

    formData.append("SearchMake", SearchMa);

    // this.api.IsLoading();
    this.api.HttpPostType("Prequotes/show_modelNew", formData).then(
      (result) => {
        // 

        // console.log(result);
        if (result["Status"] == true) {
          if (result["Data"] != "") {
            this.SelectModal = result["Data"];
            this.ModalName = result["type"];
          }
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // 
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  GetFuelSearch(SearchTerm: any) {
    const formData = new FormData();
    SearchTerm1 = "";

    const fieldsMake = this.updateMakeModal.value;

    if (SearchTerm != "") {
      const Searchvalue = SearchTerm.target.value;
      if (Searchvalue != "") {
        var SearchTerm1 = Searchvalue;
      }
    }
    formData.append("quoteId", this.urlSegment);

    formData.append("SearchFule", SearchTerm1);

    // this.api.IsLoading();
    this.api.HttpPostType("Prequotes/show_FuleNew", formData).then(
      (result) => {
        // 

        if (result["Status"] == true) {
          if (result["Data"] != "") {
            this.SearchFule = result["Data"];
            this.FuelName = result["type"];
          }
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // 
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  GetVariantSearch(SearchTerm: any) {
    const formData = new FormData();
    SearchTerm1 = "";

    const fieldsMake = this.updateMakeModal.value;

    // formData.append('fieldsRegistrationRto', fieldsRegistrationRto['make']);

    // const SearchMa = this.updateMakeModal.get("make").value;
    // console.log(fieldsMake);

    if (SearchTerm != "") {
      const Searchvalue = SearchTerm.target.value;
      if (Searchvalue != "") {
        var SearchTerm1 = Searchvalue;
      }
    }
    formData.append("quoteId", this.urlSegment);

    formData.append("SearchVariant", SearchTerm1);

    // this.api.IsLoading();
    this.api.HttpPostType("Prequotes/show_VariantNew", formData).then(
      (result) => {
        // 

        if (result["Status"] == true) {
          if (result["Data"] != "") {
            // console.log(result['type']);

            this.SearchVariant = result["Data"];
            this.VariantName = result["type"];
          }
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // 
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  async CallQuotes(dataFetch) {
    this.companyArr = ["digit", "digitNew"];

    console.log(dataFetch);

    // this.companyArr.forEach(values, function(value, key) {
    //   this.push(key + ': ' + value);
    // }, log);

    for (var i = 0; i < this.companyArr.length; i++) {
      this.callAjax2(this.companyArr[i], 1, dataFetch);
    }
    //  this.companyArr.forEach(function (item, index) {

    //  });
  }

  async callAjax2(item, length, policyData) {
    // console.log(item);
    // console.log(length);
    // console.log(policyData);
    this.responseData = "";
    this.post = [];
    const formData = new FormData();

    // formData.append("data",policyData);
    formData.append("qid", this.urlSegment);
    formData.append("data", item);
    var quoteCal;
    if (policyData.gadi_type == 1) {
      quoteCal = "quatation_calculate_bike";
    } else if (policyData.gadi_type == 2) {
      quoteCal = "quatation_calculate_carNew";
    }

    this.api.IsLoading();
    this.api.HttpPostType("Quotes/" + quoteCal, formData).then(
      (result) => {
        // console.log(result);
        this.api.HideLoading();
        this.dataArVal = result["data"];

        this.responseData = result["data"].result;
        this.post = this.post.concat(this.responseData);
        console.log(this.dataArVal.other_tp);
        // console.log(result['data'].v_data);

        // this.updateMakeModal.patchValue( this.responseData);
       

      },
      (err) => {
        this.api.HideLoading();
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  NewFunction() {
    const formData = new FormData();
    // quoteId = this.urlSegment;
    formData.append("quoteId", this.urlSegment);

    this.api.IsLoading();
    this.api.HttpPostType("Quotes/QuoteDetails", formData).then((result) => {
      this.dataArValue = result["Data"];

      // console.log(this.dataArValue);

      // this.updateMakeModal.patchValue(result["Data"])

      this.CallQuotes(this.dataArValue);
      

    });
  }

  UpdateData() {
    // this.GetQuoteDetails("");
    // alert();

    const formData = new FormData();

    this.isSubmitted = true;
    if (this.updateForm.invalid) {
      return;
    } else {
      var fields = this.updateForm.value;
      // alert(fields['tp_only']);

      // return false;

      // console.log(this.updateForm.value);

      var fieldsRegistrationDate = this.updateRegistrationDate.value;
      var fieldsPurchaseDate = this.updatePurchaseDate.value;
      var fieldsRegistrationRto = this.updateRegistrationRTO.value;
      var fieldsMakeModal = this.updateMakeModal.value;
      var fieldsThirdParty = this.updateThirdParty.value;
 

      // console.log(fieldsRegistrationRto);

      formData.append("fields", JSON.stringify(fields));
      formData.append(
        "fieldsRegistrationDate",
        fieldsRegistrationDate["registration_date"]
      );
      formData.append(
        "fieldsPurchaseDate",
        fieldsPurchaseDate["purchase_date"]
      );
      formData.append(
        "fieldsRegistrationRto",
        fieldsRegistrationRto["registration_no"]
      );
      formData.append("fieldsMake", fieldsMakeModal["make"]);
      formData.append("fieldsModal", fieldsMakeModal["model"]);
      formData.append("fieldsFuel", fieldsMakeModal["fuel_type"]);
      formData.append("fieldsVariant", fieldsMakeModal["variant"]);

      formData.append("tp_expire_policy_cpmpany", fieldsThirdParty["tp_expire_policy_cpmpany"]);
      formData.append("tp_expire_policy_number", fieldsThirdParty["tp_expire_policy_number"]);
      formData.append("tp_policy_expire_date", fieldsThirdParty["tp_policy_expire_date"]);

      formData.append("quoteId", this.urlSegment);

      this.api.IsLoading();
      this.api.HttpPostType("Quotes/update_detailsNew", formData).then(
        (result) => {
          // 

          if (result["Status"] == true) {
            // this.NewFunction();
            $("#edit_vehical_details_popup").removeClass("is_visible");
            $("#third_party_details").removeClass("is_visible");
            this.api.Toast("Success", result["Message"]);


            this.dataArValue = result["Data"][0];
            // console.log( this.dataArValue);

            this.updateRegistrationDate.patchValue(this.dataArValue);
           this.updatePurchaseDate.patchValue(this.dataArValue);
           this.updateRegistrationRTO.patchValue(this.dataArValue);
           this.updateMakeModal.patchValue(this.dataArValue);
           this.updateThirdParty.patchValue(this.dataArValue);


            // this.GetQuoteDetails(2);

            this.CallQuotes(result["Data"][0]);
          } else {
            const msg = "msg";
            this.api.Toast("Warning", result["msg"]);
          }
        },
        (err) => {
          
          const newLocal = "Warning";
          this.api.Toast(
            newLocal,
            "Network Error : " + err.name + "(" + err.statusText + ")"
          );
        }
      );
    }
  }

  UpdateDataTpOnly(e:any){

    this.updateForm.get('tp_only').setValue(e);


    this.UpdateData();
    

  }

  get updateMakeModalError() {
    return this.updateMakeModal.controls;
  }

  updateMakeModelForm() {
    this.isSubmitted = true;
    if (this.updateMakeModal.invalid) {
      return;
    } else {
      this.UpdateData();
    }
  }

  GetQuoteDetails(SearchTerm: any) {
    const formData = new FormData();
    // quoteId = this.urlSegment;
    formData.append("quoteId", this.urlSegment);

    this.api.IsLoading();
    this.api.HttpPostType("Quotes/index", formData).then((result) => {
      this.dataArValue = result["Data"];

       this.updateForm.patchValue(result["Data"]);
      this.updateRegistrationDate.patchValue(this.dataArValue);
      this.updatePurchaseDate.patchValue(this.dataArValue);
      this.updateRegistrationRTO.patchValue(this.dataArValue);
      this.updateMakeModal.patchValue(this.dataArValue);
      this.updateThirdParty.patchValue(this.dataArValue);
      

    });
  }

  //===== ON OPTION SELECT =====//

  GetModel(SearchTerm: any) {
    const formData = new FormData();
    const SearchMa = this.updateMakeModal.get("make").value;

    this.updateMakeModal.get("model").setValue("");
    this.updateMakeModal.get("fuel_type").setValue("");

    var type = this.dataArValue.gadi_type;
    // console.log(type);

    if (type == 1) {
      var gadi_type = "two-wheeler-online";
    }
    if (type == 2) {
      var gadi_type = "car-insurance-online";
    }

    SearchTerm1 = "";
    if (SearchTerm != "") {
      const Searchvalue = SearchTerm.target.value;
      if (Searchvalue != "") {
        var SearchTerm1 = Searchvalue;
      }
    }
    formData.append("type", gadi_type);
    formData.append("SearchMake", SearchMa);
    formData.append("SearchModel", SearchTerm1);

    // this.api.IsLoading();
    this.api.HttpPostType("Prequotes/get_model", formData).then(
      (result) => {
        // 

        if (result["Status"] == true) {
          if (result["Data"] != "") {
            this.SelectModal = result["Data"];
          }
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // 
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  GetFuel(SearchTerm: any) {
    const formData = new FormData();
    SearchTerm1 = "";
    const SearchMa = this.updateMakeModal.get("make").value;
    const SearchMo = this.updateMakeModal.get("model").value;
    this.updateMakeModal.get("variant").setValue("");

    var type = this.dataArValue.gadi_type;
    // console.log(type);

    if (type == 1) {
      var gadi_type = "two-wheeler-online";
    }
    if (type == 2) {
      var gadi_type = "car-insurance-online";
    }

    if (SearchTerm != "") {
      const Searchvalue = SearchTerm.target.value;
      if (Searchvalue != "") {
        var SearchTerm1 = Searchvalue;
      }
    }

    formData.append("type", gadi_type);
    formData.append("SearchMake", SearchMa);
    formData.append("SearchModel", SearchMo);
    formData.append("SearchFuel", SearchTerm1);

    // this.api.IsLoading();
    this.api.HttpPostType("Prequotes/get_fuel", formData).then(
      (result) => {
        // 

        // console.log(result);
        if (result["Status"] == true) {
          if (result["Data"] != "") {
            this.SearchFule = result["Data"];
          }
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // 
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  GetVariant(SearchTerm: any) {
    const formData = new FormData();
    const SearchMa = this.updateMakeModal.get("make").value;
    const SearchMo = this.updateMakeModal.get("model").value;
    const SearchFu = this.updateMakeModal.get("fuel_type").value;
    var SearchTerm1 = "";

    var type = this.dataArValue.gadi_type;
    // console.log(type);

    if (type == 1) {
      var gadi_type = "two-wheeler-online";
    }
    if (type == 2) {
      var gadi_type = "car-insurance-online";
    }

    if (SearchTerm != "") {
      const Searchvalue = SearchTerm.target.value;
      if (Searchvalue != "") {
        SearchTerm1 = Searchvalue;
      }
    }

    formData.append("type", gadi_type);
    formData.append("SearchMake", SearchMa);
    formData.append("SearchModel", SearchMo);
    formData.append("SearchFuel", SearchFu);
    formData.append("SearchVariant", SearchTerm1);

    // this.api.IsLoading();
    this.api.HttpPostType("Prequotes/get_variant", formData).then(
      (result) => {
        // 

        console.log(result);
        if (result["Status"] == true) {
          if (result["Data"] != "") {
            this.SearchVariant = result["Data"];
          }
          // console.log(this.items);
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // 
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  //===== ON OPTION DESELECT =====//
  onItemDeSelect(item: any, Type: any) {
    //Employee
    if (Type == "Manufacture") {
      this.updateMakeModal.get("model").setValue("");
      this.updateMakeModal.get("fuel_type").setValue("");
      this.updateMakeModal.get("variant").setValue("");
      this.GetModel("");
    }
  }

  onItemSelect(item: any, Type: any) {
    //Financial Year

    const type = this.updateMakeModal.get("gadi_type");

    if (Type == "Manufacture") {
      this.updateMakeModal.get("model").setValue("");
      this.updateMakeModal.get("fuel_type").setValue("");
      this.updateMakeModal.get("variant").setValue("");
      this.GetModel("");
    }

    if (Type == "Modal") {
      this.updateMakeModal.get("fuel_type").setValue("");
      this.updateMakeModal.get("variant").setValue("");
      this.GetFuel("");
    }

    if (Type == "Fule") {
      this.updateMakeModal.get("variant").setValue("");
      this.GetVariant("");
    }
  }
}
