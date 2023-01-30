import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../providers/api.service";
import { empty } from "rxjs";

@Component({
  selector: "app-proposal",
  templateUrl: "./proposal.component.html",
  styleUrls: ["./proposal.component.css"],
})
export class ProposalComponent implements OnInit {
  ShowForm = 1;
  Owner_Details_Form: FormGroup;
  isSubmitted: boolean;
  Vehicle_Details_Form: FormGroup;
  Nominee_Details_Form: FormGroup;
  Last_Policy_Details: FormGroup;
  selectedFiles: any;
  Pan_Card_Document: any;
  Pan_Card_Document_image: number;
  Cancel_Cheque: any;
  Cancel_Cheque_image: number;
  Aadhar_card_Front: any;
  Aadhar_card_Front_image: number;
  Aadhar_card_Back: any;
  Aadhar_card_Back_image: number;
  Electricity_Bill: any;
  Electricity_Bill_image: number;
  Reg_Certificate: any;
  Reg_Certificate_image: number;
  Photo: any;
  Photo_image: number;
  Company: any;
  CompanyName: any;
  SalutationData: any;
  MaritalStatus: any;
  StateData: any;
  CityData: any;
  PincodeData: [];
  GenderData: any;
  FinanciarNameData: any;
  FinanciarCityData: any;
  dropdownSettingsingleselect: {
    singleSelection: boolean;
    idField: string;
    textField: string;
    itemsShowLimit: number;
    enableCheckAll: boolean;
    allowSearchFilter: boolean;
  };
  QuoteId: any;
  QuoteDetails: any;
  PurposalDetails: any;
  RtoLocationData: any;
  NomineeRelationData: any;
  SelectedPincode: any;
  SelectedFinancierCity: any;
  SelectedSalutation: any;
  SelectedMaritalStatus: any;
  SelectedFinancierName: any;
  SelectedNomineeGender: any;
  SelectedNomineeReleation: any;
  SelectedGender: any;
  SelectedRto: any;
  maxDatemaxDate: any;
  ImageCompanyLogo: any;
  fruitList: (
    | { id: string; text: string; disabled?: undefined }
    | { id: string; disabled: boolean; text: string }
  )[];
  Pin: any;
  selecteddataval: any;
  cars: { code: number; name: string }[];

  constructor(
    public api: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.cars = [
      { code: 1, name: "Volvo" },
      { code: 2, name: "Saab" },
      { code: 3, name: "Opel" },
      { code: 4, name: "Audi" },
    ];

    this.maxDatemaxDate = "2004-01-01";
    this.dropdownSettingsingleselect = {
      singleSelection: true,
      idField: "code",
      textField: "name",
      itemsShowLimit: 2,
      enableCheckAll: false,
      allowSearchFilter: true,
    };
    this.CompanyName = this.activatedRoute.snapshot.paramMap.get("company");
    this.QuoteId = this.activatedRoute.snapshot.paramMap.get("quotation");

    this.Owner_Details_Form = this.formBuilder.group({
      salutation: ["", [Validators.required]],
      first_name: [
        "",
        [Validators.required, Validators.pattern("[a-zA-Z ]*$")],
      ],
      last_name: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*$")]],
      gender: ["", [Validators.required]],
      marital_status: ["", [Validators.required]],
      dob: [""],
      email_proposal: [
        "",
        [
          Validators.pattern(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[A-Za-z]{2,4}$"
          ),
        ],
      ],
      mobile_proposal: [
        "",
        [
          Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$"),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      address1: ["", [Validators.required]],
      address2: ["", [Validators.required]],
      address3: ["", [Validators.required]],

      pincode: ["", [Validators.required]],
      pincodeVal: [""],

      city: [""],
      kyc_doc: [0],
      state: [""],
      pan_no: ["", [Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]],
      gst_no: [
        "",
        [
          Validators.pattern(
            "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
          ),
        ],
      ],
    });

    this.Vehicle_Details_Form = this.formBuilder.group({
      rto_location: ["", [Validators.required]],
      engine_no: [
        "",
        [Validators.required, Validators.pattern("[a-zA-Z0-9]*$")],
      ],
      chassies_no: [
        "",
        [Validators.required, Validators.pattern("[a-zA-Z0-9]*$")],
      ],
      financier_name: [""],
      financier_city: [""],
      hypothecation: [0],
    });

    this.Nominee_Details_Form = this.formBuilder.group({
      nominee_name: ["", [Validators.required]],
      nominee_gender: ["", [Validators.required]],
      nominee_dob: [""],
      nominee_relation: [""],
    });

    this.Last_Policy_Details = this.formBuilder.group({
      previous_policy_number: ["", [Validators.required]],
      Previous_Policy_Company_Name: [""],
      End_Date_Of_Policy: [""],
      Previous_Insurance_Claimed: [""],
    });
  }

  ngOnInit() {
    this.PurposalData("salutation");
    this.PurposalData("marital_status");
    this.PurposalData("pincode");
    this.PurposalData("gender");
    this.PurposalData("nominee_relation");
    //  this.PurposalData("insurer");/
    this.GetRto();
    this.PurposalDataFetch();
    // this.PurposalPincode("");
  }

  //   SearchConditation(SelectedData:any,searchval:any){

  //     this.selecteddataval = SelectedData.find(({ name }) => name === searchval);
  // console.log(SelectedData);
  //   }

  get formControls1() {
    return this.Owner_Details_Form.controls;
  }
  get formControls2() {
    return this.Vehicle_Details_Form.controls;
  }
  get formControls3() {
    return this.Nominee_Details_Form.controls;
  }
  get formControls4() {
    return this.Last_Policy_Details.controls;
  }

  ShowDiv(Val: any) {}

  Hypothecation(e) {
    const Value = e.target.value;
    if (Value == 1) {
    }
  }

  AddForm(Section) {
    this.isSubmitted = true;

    if (Section == 0) {
      this.ShowForm = 1;
    }

    if (Section == 1) {
      if (this.Owner_Details_Form.invalid) {
        return;
      } else {
        this.ShowForm = Section + 1;
        this.GetFinancierInsurerName("");
        this.GetFinancierInsurerCity("");
      }
    }

    if (Section == 2) {
      if (this.Vehicle_Details_Form.invalid) {
        return;
      } else {
        this.ShowForm = Section + 1;
      }
    }

    if (Section == 3) {
      if (this.Nominee_Details_Form.invalid) {
        return;
      } else {
        this.ShowForm = Section + 1;

        this.Last_Policy_Details.get("Previous_Policy_Company_Name").setValue(
          this.QuoteDetails["previous_insurer"]
        );
        this.Last_Policy_Details.get("End_Date_Of_Policy").setValue(
          this.QuoteDetails["policy_expiery_date"]
        );

        if (this.QuoteDetails["city"] == 1) {
          this.Last_Policy_Details.get("Previous_Insurance_Claimed").setValue(
            "Yes"
          );
        } else {
          this.Last_Policy_Details.get("Previous_Insurance_Claimed").setValue(
            "No"
          );
        }
      }
    }

    if (Section == 4) {
      if (this.Last_Policy_Details.invalid) {
        return;
      } else {
        var fields4 = this.Last_Policy_Details.value;
        this.ShowForm = Section + 1;
      }
    }

    console.log(this.ShowForm);
  }

  BackForm(Section) {
    if (Section == 4) {
      this.ShowForm = Section - 1;
    }
    if (Section == 3) {
      this.ShowForm = Section - 1;
    }
    if (Section == 2) {
      this.ShowForm = Section - 1;
    }
    if (Section == 1) {
      this.router.navigate(["/quotes/index/" + btoa(this.QuoteId)]);
    }
  }

  UploadDocs(event, Type) {
    this.selectedFiles = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      console.log(this.selectedFiles);
      console.log(this.selectedFiles.name);
      var str = this.selectedFiles.name;
      var ar = str.split(".");
      console.log(ar);
      var ext;
      for (var i = 0; i < ar.length; i++) ext = ar[i].toLowerCase();
      console.log(ext);

      if (ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "pdf") {
        console.log("Extenstion is vaild !");
        var file_size = event.target.files[0]["size"];
        const Total_Size = Math.round(file_size / 1024);
        // alert(Total_Size);
        console.log(Total_Size + " kb");

        if (Total_Size >= 10240) {
          // allow only 2 mb

          this.api.Toast("Error", "File size is greater than 10 mb");

          if (Type == "Pan_Card_Document") {
            this.Pan_Card_Document = this.selectedFiles;
            this.Pan_Card_Document_image = 1;
          }
          if (Type == "Cancel_Cheque") {
            this.Cancel_Cheque = this.selectedFiles;
            this.Cancel_Cheque_image = 1;
          }
          if (Type == "Aadhar_card_Front") {
            this.Aadhar_card_Front = this.selectedFiles;
            this.Aadhar_card_Front_image = 1;
          }
          if (Type == "Aadhar_card_Back") {
            this.Aadhar_card_Back = this.selectedFiles;
            this.Aadhar_card_Back_image = 1;
          }
          if (Type == "Electricity_Bill") {
            this.Electricity_Bill = this.selectedFiles;
            this.Electricity_Bill_image = 1;
          }
          if (Type == "Reg_Certificate") {
            this.Reg_Certificate = this.selectedFiles;
            this.Reg_Certificate_image = 1;
          }
          if (Type == "Photo") {
            this.Photo = this.selectedFiles;
            this.Photo_image = 1;
          }
        } else {
          console.log("Extenstion is not vaild !");

          this.api.Toast(
            "Error",
            "Please choose vaild file ! Example :- PNG,JPEG,JPG,PDF"
          );
        }
      }
    }
  }

  PurposalData(SearchCondition) {
    const formData = new FormData();

    formData.append("type", SearchCondition);
    formData.append("company", this.CompanyName);

    // this.api.IsLoading();
    this.api.HttpPostType("Api_master/masterData", formData).then(
      (result) => {
        // this.api.HideLoading();

        // console.log(result);
        if (result["status"] == 1) {
          if (SearchCondition == "salutation") {
            this.SalutationData = result["Data"];
          }
          if (SearchCondition == "marital_status") {
            this.MaritalStatus = result["Data"];
          }

          // if(SearchCondition =='state'){
          //   this.StateData=result["Data"];
          // }
          // if(SearchCondition =='city'){
          //   this.CityData=result["Data"];
          // }
          if (SearchCondition == "pincode") {
            this.PincodeData = result["Data"];
          }

          if (SearchCondition == "gender") {
            this.GenderData = result["Data"];
          }

          if (SearchCondition == "insurer") {
            this.FinanciarNameData = result["Data"];
          }

          if (SearchCondition == "nominee_relation") {
            this.NomineeRelationData = result["Data"];
          }
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // this.api.HideLoading();
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  SetFormcontrolvalue(Fomcontrol: any, val: any, formval: any) {
    this.PincodeData = [];
    this.SalutationData = [];

    if (formval == 1) {
      this.Owner_Details_Form.get(Fomcontrol).setValue(val);

      if (Fomcontrol == "pincode") {
        // document.getElementById(Fomcontrol+'Val').value=val;
        this.SelectedPincodeGetStateCity();
      }
    }
  }

  PurposalPincode(SearchTerm: any) {
    this.Owner_Details_Form.get("pincode").setValue("");

    const formData = new FormData();
    SearchTerm1 = "";

    if (SearchTerm != "") {
      const Searchvalue = SearchTerm.target.value;
      if (Searchvalue != "") {
        var SearchTerm1 = Searchvalue;
      }
    }
    formData.append("SearchCondition", SearchTerm1);
    formData.append("type", "Pincode");
    formData.append("company", this.CompanyName);

    // this.api.IsLoading();
    this.api.HttpPostType("Api_master/SearchPincodeData", formData).then(
      (result) => {
        // this.api.HideLoading();

        // console.log(result);
        if (result["Status"] == true) {
          this.PincodeData = result["Data"];
          if (this.PincodeData.length == 0) {
            // this.Owner_Details_Form.get('pincode').setValue("");
          }
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // this.api.HideLoading();
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  SelectedPincodeGetStateCity() {
    const formData = new FormData();
    SearchTerm1 = "";

    const Pincode = this.Owner_Details_Form.get("pincode").value;

    if (Pincode != "") {
      const Searchvalue = Pincode;
      if (Searchvalue != "") {
        var SearchTerm1 = Searchvalue;
      }
    }

    formData.append("pincode", SearchTerm1);
    formData.append("type", "Pincode");
    formData.append("company", this.CompanyName);

    // this.api.IsLoading();
    this.api.HttpPostType("Api_master/SearchPincodeStateData", formData).then(
      (result) => {
        // this.api.HideLoading();

        // console.log(result);
        if (result["Status"] == true) {
          this.Owner_Details_Form.get("state").setValue(result["state"]);
          this.Owner_Details_Form.get("city").setValue(result["city"]);
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // this.api.HideLoading();
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
    if (Type == "Pincode") {
      this.SelectedPincodeGetStateCity();
    }
  }

  onItemSelect(item: any, Type: any) {
    //Financial Year
    if (Type == "Pincode") {
      this.SelectedPincodeGetStateCity();
    }
  }

  PurposalDataFetch() {
    const formData = new FormData();

    formData.append("QuoteId", this.QuoteId);
    formData.append("company", this.CompanyName);

    // this.api.IsLoading();
    this.api.HttpPostType("Proposal/digit", formData).then(
      (result) => {
        // this.api.HideLoading();

        console.log(result);
        if (result["Status"] == true) {
          this.ImageCompanyLogo = result["Logo"];
          this.QuoteDetails = result["Data"]["details"][0];
          this.PurposalDetails = result["Data"]["details_user"][0];
          this.maxDatemaxDate = result["Data"]["MaxAge"];
          this.Pin = this.PurposalDetails["pincode"];
          console.log(this.ImageCompanyLogo);
          // document.getElementById('pincodeVal').value=this.Pin;

          this.Owner_Details_Form.patchValue(this.PurposalDetails);
          this.Last_Policy_Details.patchValue(this.PurposalDetails);
          this.Nominee_Details_Form.patchValue(this.PurposalDetails);
          this.Vehicle_Details_Form.patchValue(this.PurposalDetails);

          if (this.PurposalDetails != "") {
            this.GetASelectFieldsData();
          }

          console.log(result["Data"]);
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // this.api.HideLoading();
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  GetASelectFieldsData() {
    const formData = new FormData();

    formData.append("QuoteId", this.QuoteId);
    formData.append("company", this.CompanyName);

    // this.api.IsLoading();
    this.api.HttpPostType("Proposal/GetASelectFieldsData", formData).then(
      (result) => {
        // this.api.HideLoading();
        // console.log(result);
        if (result["Status"] == true) {
          console.log(result["Data"]);

          this.SelectedPincode = result["Data"]["pincode"];
          this.SelectedSalutation = result["Data"]["salutation"];
          this.SelectedMaritalStatus = result["Data"]["marital_status"];
          this.SelectedFinancierCity = result["Data"]["financier_city"];
          this.SelectedFinancierName = result["Data"]["financier_name"];
          this.SelectedNomineeGender = result["Data"]["nominee_gender"];
          this.SelectedNomineeReleation = result["Data"]["nominee_relation"];
          this.SelectedGender = result["Data"]["gender"];
          this.SelectedRto = result["Data"]["rto_location"];

          // this.Owner_Details_Form.get("pincode").setValue(result["Data"]["pincode"]);
          // this.Owner_Details_Form.patchValue(this.PurposalDetails);
          // this.Last_Policy_Details.patchValue(this.PurposalDetails);
          // this.Nominee_Details_Form.patchValue(this.PurposalDetails);
          // this.Vehicle_Details_Form.patchValue(this.PurposalDetails);

          console.log(result["Data"]);
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // this.api.HideLoading();
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  SubmitForm() {
    const formData = new FormData();
    var fields1 = this.Owner_Details_Form.value;
    var fields2 = this.Vehicle_Details_Form.value;
    var fields3 = this.Nominee_Details_Form.value;
    var fields4 = this.Last_Policy_Details.value;

    formData.append("quotation_id", this.QuoteId);
    formData.append("registration_no", this.QuoteDetails["registration_no"]);

    //Field1
    formData.append("salutation", fields1["salutation"]);
    formData.append("first_name", fields1["first_name"]);
    formData.append("last_name", fields1["last_name"]);
    formData.append("gender", fields1["gender"]);
    formData.append("marital_status", fields1["marital_status"]);
    formData.append("dob", fields1["dob"]);
    formData.append("mobile_proposal", fields1["mobile_proposal"]);
    formData.append("email_proposal", fields1["email_proposal"]);
    formData.append("address1", fields1["address1"]);
    formData.append("address2", fields1["address2"]);
    formData.append("address3", fields1["address3"]);
    formData.append("state", fields1["state"]);
    formData.append("city", fields1["city"]);
    formData.append("pan_no", fields1["pan_no"]);
    formData.append("gst_no", fields1["gst_no"]);
    formData.append("pincode", fields1["pincode"]);

    //Fields2
    formData.append("rto_location", fields2["rto_location"]);
    formData.append("engine_no", fields2["engine_no"]);
    formData.append("chassies_no", fields2["chassies_no"]);
    formData.append("hypothecation", fields2["hypothecation"]);

    formData.append("financier_name", fields2["financier_name"]);
    formData.append("financier_city", fields2["financier_city"]);

    //Fields3
    formData.append("nominee_relation", fields3["nominee_relation"]);
    formData.append("nominee_gender", fields3["nominee_gender"]);
    formData.append("nominee_name", fields3["nominee_name"]);
    formData.append("nominee_dob", fields3["nominee_dob"]);

    //Field4
    formData.append(
      "previous_policy_number",
      fields4["previous_policy_number"]
    );

    // this.api.IsLoading();
    this.api.HttpPostType("Proposal/save_user_details", formData).then(
      (result) => {
        // this.api.HideLoading();

        console.log(result);
        if (result["Status"] == true) {
          // alert("Successfully SUVMIY");
          this.router.navigateByUrl("/review-pay/" + this.QuoteId);
          console.log(result["Data"]);
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // this.api.HideLoading();
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  GetRto() {
    const formData = new FormData();

    formData.append("quotation_id", this.QuoteId);

    // this.api.IsLoading();
    this.api.HttpPostType("Api_master/RtoLocationData", formData).then(
      (result) => {
        // this.api.HideLoading();

        console.log(result);
        if (result["Status"] == true) {
          this.RtoLocationData = result["Data"];

          console.log(result["Data"]);
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // this.api.HideLoading();
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  GetFinancierInsurerCity(SearchTerm: any) {
    const formData = new FormData();
    SearchTerm1 = "";

    if (SearchTerm != "") {
      const Searchvalue = SearchTerm.target.value;
      if (Searchvalue != "") {
        var SearchTerm1 = Searchvalue;
      }
    }
    formData.append("SearchCondition", SearchTerm1);
    formData.append("type", "InsurerCity");
    formData.append("company", this.CompanyName);

    // this.api.IsLoading();
    this.api.HttpPostType("Api_master/SearchFinancerCityData", formData).then(
      (result) => {
        // this.api.HideLoading();

        // console.log(result);
        if (result["Status"] == true) {
          this.FinanciarCityData = result["Data"];
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // this.api.HideLoading();
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  GetFinancierInsurerName(SearchTerm: any) {
    const formData = new FormData();
    SearchTerm1 = "";

    if (SearchTerm != "") {
      const Searchvalue = SearchTerm.target.value;
      if (Searchvalue != "") {
        var SearchTerm1 = Searchvalue;
      }
    }
    formData.append("SearchCondition", SearchTerm1);
    formData.append("type", "InsurerName");
    formData.append("company", this.CompanyName);

    // this.api.IsLoading();
    this.api.HttpPostType("Api_master/SearchFinancerNameData", formData).then(
      (result) => {
        // this.api.HideLoading();

        // console.log(result);
        if (result["Status"] == true) {
          this.FinanciarNameData = result["Data"];
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // this.api.HideLoading();
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  UploadDocument() {
    const formData = new FormData();
    formData.append("Pan_Card_Document", this.Pan_Card_Document);
    formData.append("Cancel_Cheque", this.Cancel_Cheque);
    formData.append("Aadhar_card_Front", this.Aadhar_card_Front);
    formData.append("Aadhar_card_Back", this.Aadhar_card_Back);
    formData.append("Electricity_Bill", this.Electricity_Bill);
    formData.append("Reg_Certificate", this.Reg_Certificate);
    formData.append("Photo", this.Photo);

    // this.api.IsLoading();
    this.api.HttpPostType("Proposal/UploadKycDocument", formData).then(
      (result) => {
        // this.api.HideLoading();

        console.log(result);
        if (result["Status"] == true) {
          alert("Successfully SUVMIY");

          console.log(result["Data"]);
        } else {
          const Message = "Message";
          this.api.Toast("Warning", result["Message"]);
        }
      },
      (err) => {
        // this.api.HideLoading();
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }
}
