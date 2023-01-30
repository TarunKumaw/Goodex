import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../providers/api.service";
// import { NgSelectModule, NgOption } from "@ng-select/ng-select";

@Component({
  selector: "app-prequotes",
  templateUrl: "./prequotes.component.html",
  styleUrls: ["./prequotes.component.css"],
})
export class PrequotesComponent implements OnInit {
  // OfflineQuoteForm: FormGroup;
  PrequotesForm: FormGroup;
  isSubmitted: boolean;
  Section1: number;

  GadiType: string;

  AddSenctionForm1: FormGroup;
  AddSenctionForm2: FormGroup;
  AddSenctionForm3: FormGroup;
  AddSenctionForm4: FormGroup;
  AddSenctionForm5: FormGroup;
  AddSenctionForm6: FormGroup;
  AddSenctionForm7: FormGroup;
  AddSenctionForm8: FormGroup;
  currentUrl: string;
  urlSegment: any;
  urlSegmentRoot: any;
  urlSegmentSub: any;
  public items: Array<string>;
  SelectMake: [];
  SelectModel: [];
  dropdownSettingsingleselect: {
    singleSelection: boolean;
    idField: string;
    textField: string;
    itemsShowLimit: number;
    enableCheckAll: boolean;
    allowSearchFilter: boolean;
  };
  SelectFuel: any;
  SelectVariant: any;
  SelectRegistrationYear: any;
  SelectPolicyExpiry: { Id: string; Name: string }[];
  SelectPreviousPolicy: { Id: string; Name: string }[];
  SelectPreviousInsurer: any;
  type: any;
  RegistrationNumber: any;
  MakeValue: any;
  ModelValue: any;
  VariantValue: any;
  FuelValue: any;

  constructor(
    public api: ApiService,
    private router: Router, 
    private formBuilder: FormBuilder
  ) {
    this.Section1 = 1;
    this.GadiType = "rollower";

    this.dropdownSettingsingleselect = {
      singleSelection: true,
      idField: "Id",
      textField: "Name",
      itemsShowLimit: 2,
      enableCheckAll: false,
      allowSearchFilter: true,
    };

    //Check Url Segment
    this.currentUrl = this.router.url;
    var splitted = this.currentUrl.split("/");
    if (typeof splitted[2] != "undefined") {
      this.urlSegment = splitted[2];
    }

    if (typeof splitted[1] != "undefined") {
      this.urlSegmentRoot = splitted[1];
    }

    if (typeof splitted[3] != "undefined") {
      this.urlSegmentSub = splitted[3];
    }

    this.AddSenctionForm1 = this.formBuilder.group({
      Registration_State_Code: [
        "",
        [Validators.required, Validators.pattern("[a-zA-Z ]*$")],
      ],
      Registration_District_Code: [
        "",
        [Validators.required, Validators.pattern("[0-9 ]*$")],
      ],
      Registration_City_Code: ["", Validators.required],
      Registration_Code: [
        "",
        [Validators.required, Validators.pattern("[0-9 ]*$")],
      ],
    });

    this.AddSenctionForm2 = this.formBuilder.group({
      QuoteMake: ["", Validators.required],
    });

    this.AddSenctionForm3 = this.formBuilder.group({
      QuoteModel: ["", Validators.required],
    });

    this.AddSenctionForm4 = this.formBuilder.group({
      QuoteFuel: ["", Validators.required],
    });
    this.AddSenctionForm5 = this.formBuilder.group({
      QuoteVariant: ["", Validators.required],
    });
    this.AddSenctionForm6 = this.formBuilder.group({
      QuoteRegistrationYear: ["", Validators.required],
    });
    this.AddSenctionForm7 = this.formBuilder.group({
      QuotePolicyExpiry: ["", Validators.required],
      QuotePreviousPolicy: ["", Validators.required],
      QuotePreviousInsurer: ["", Validators.required],
      QuoteDontKnow: ["", Validators.required],
    });
    this.AddSenctionForm8 = this.formBuilder.group({
      QuoteName: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*$")]],
      QuoteEmail: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      QuoteMobile: [
        "",
        [
          Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$"),
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.required,
        ],
      ],
      QuoteConditions: ["", Validators.required],
      // QuoteOtp: ["", Validators.required],
    });

    this.SelectPolicyExpiry = [
      { Id: "Not Expired", Name: "Not Expired" },
      { Id: "Expired within 90 days", Name: "Expired within 90 days" },
      { Id: "Expired more than 90 days", Name: "Expired more than 90 days" },
    ];
    this.SelectPreviousPolicy = [
      { Id: "comprehensive", Name: "Comprehensive" },
      { Id: "third_party", Name: "Third Party" },
    ];
  }

  ngOnInit() {
    this.AddSenctionForm7.get("QuoteDontKnow").setValue(0);
    if (this.urlSegment == "two-wheeler-online") {
      this.GetMake("");
    } else if (this.urlSegment == "car-insurance-online") {
      this.GetMake("");
    }
  }

  UpdateGadiType(value) {
    this.GadiType = value;

    const Registration_City_Code = this.AddSenctionForm1.get(
      "Registration_City_Code"
    );
    const Registration_Code = this.AddSenctionForm1.get("Registration_Code");

    if (this.GadiType == "new_gadi") {
      Registration_Code.setValidators(null);
      Registration_City_Code.setValidators(null);
    } else {
      Registration_Code.setValidators([Validators.required]);
      Registration_City_Code.setValidators([Validators.required]);
    }
    Registration_Code.updateValueAndValidity();
    Registration_City_Code.updateValueAndValidity();
  }

  get formControls1() {
    return this.AddSenctionForm1.controls;
  }
  get formControls2() {
    return this.AddSenctionForm2.controls;
  }
  get formControls3() {
    return this.AddSenctionForm3.controls;
  }
  get formControls4() {
    return this.AddSenctionForm4.controls;
  }
  get formControls5() {
    return this.AddSenctionForm5.controls;
  }
  get formControls6() {
    return this.AddSenctionForm6.controls;
  }
  get formControls7() {
    return this.AddSenctionForm7.controls;
  }
  get formControls8() {
    return this.AddSenctionForm8.controls;
  }

  GetMake(SearchTerm: any) {
    const formData = new FormData();
    SearchTerm1 = "";

    if (SearchTerm != "") {
      const Searchvalue = SearchTerm.target.value;
      if (Searchvalue != "") {
        var SearchTerm1 = Searchvalue;
      }
    }

    formData.append("type", this.urlSegment);
    formData.append("SearchMake", SearchTerm1);

    // this.api.IsLoading();
    this.api.HttpPostType("Prequotes/get_make", formData).then(
      (result) => {
        // this.api.HideLoading();

        // console.log(result);
        if (result["Status"] == true) {
          if (result["Data"] != "") {
            this.SelectMake = result["Data"];
            this.type = result["type"];
          }
          console.log(this.items);
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

  GetModel(SearchTerm: any) {
    const formData = new FormData();
    const SearchMa = this.AddSenctionForm2.get("QuoteMake").value;
    SearchTerm1 = "";
    if (SearchTerm != "") {
      const Searchvalue = SearchTerm.target.value;
      if (Searchvalue != "") {
        var SearchTerm1 = Searchvalue;
      }
    }
    formData.append("type", this.urlSegment);
    formData.append("SearchMake", SearchMa);
    formData.append("SearchModel", SearchTerm1);

    // this.api.IsLoading();
    this.api.HttpPostType("Prequotes/get_model", formData).then(
      (result) => {
        // this.api.HideLoading();

        console.log(result);
        if (result["Status"] == true) {
          if (result["Data"] != "") {
            this.SelectModel = result["Data"];
          }
          console.log(this.items);
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

  GetFuel(SearchTerm: any) {
    const formData = new FormData();
    SearchTerm1 = "";
    const SearchMa = this.AddSenctionForm2.get("QuoteMake").value;
    const SearchMo = this.AddSenctionForm3.get("QuoteModel").value;

    if (SearchTerm != "") {
      const Searchvalue = SearchTerm.target.value;
      if (Searchvalue != "") {
        var SearchTerm1 = Searchvalue;
      }
    }

    formData.append("type", this.urlSegment);
    formData.append("SearchMake", SearchMa);
    formData.append("SearchModel", SearchMo);
    formData.append("SearchFuel", SearchTerm1);

    // this.api.IsLoading();
    this.api.HttpPostType("Prequotes/get_fuel", formData).then(
      (result) => {
        // this.api.HideLoading();

        // console.log(result);
        if (result["Status"] == true) {
          if (result["Data"] != "") {
            this.SelectFuel = result["Data"];
          }
          console.log(this.items);
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

  GetVariant(SearchTerm: any) {
    const formData = new FormData();
    const SearchMa = this.AddSenctionForm2.get("QuoteMake").value;
    const SearchMo = this.AddSenctionForm3.get("QuoteModel").value;
    const SearchFu = this.AddSenctionForm4.get("QuoteFuel").value;
    var SearchTerm1 = "";

    if (SearchTerm != "") {
      const Searchvalue = SearchTerm.target.value;
      if (Searchvalue != "") {
        SearchTerm1 = Searchvalue;
      }
    }

    formData.append("type", this.urlSegment);
    formData.append("SearchMake", SearchMa);
    formData.append("SearchModel", SearchMo);
    formData.append("SearchFuel", SearchFu);
    formData.append("SearchVariant", SearchTerm1);

    // this.api.IsLoading();
    this.api.HttpPostType("Prequotes/get_variant", formData).then(
      (result) => {
        // this.api.HideLoading();

        console.log(result);
        if (result["Status"] == true) {
          if (result["Data"] != "") {
            this.SelectVariant = result["Data"];
          }
          console.log(this.items);
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

  GetRegistrationYear() {
    const formData = new FormData();

    formData.append("type", this.urlSegment);

    // this.api.IsLoading();
    this.api.HttpPostType("Prequotes/get_financial_year", formData).then(
      (result) => {
        // this.api.HideLoading();

        console.log(result);
        if (result["Status"] == true) {
          if (result["Data"] != "") {
            this.SelectRegistrationYear = result["Data"];
          }
          console.log(this.items);
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

  GetPreviousInsurer() {
    const formData = new FormData();

    formData.append("type", this.urlSegment);

    // this.api.IsLoading();
    this.api.HttpPostType("Prequotes/get_insurer", formData).then(
      (result) => {
        // this.api.HideLoading();

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
        // this.api.HideLoading();
        const newLocal = "Warning";
        this.api.Toast(
          newLocal,
          "Network Error : " + err.name + "(" + err.statusText + ")"
        );
      }
    );
  }

  AddPreQuotesForm(Section) {
    this.isSubmitted = true;

    if (Section == 0) {
      this.Section1 = 1;
    }

    if (Section == 1) {
      if (this.AddSenctionForm1.invalid) {
        return;
      } else {
        var fields1 = this.AddSenctionForm1.value;

        this.RegistrationNumber =
          fields1["Registration_State_Code"] +
          fields1["Registration_District_Code"] +
          fields1["Registration_City_Code"] +
          fields1["Registration_Code"];
        this.Section1 = Section + 1;
      }
    }

    if (Section == 2) {
      if (this.AddSenctionForm2.invalid) {
        return;
      } else {
        this.isSubmitted = false;

        var fields2 = this.AddSenctionForm2.value;

        this.MakeValue = fields2["QuoteMake"];
        this.Section1 = Section + 1;
        this.AddSenctionForm3.get("QuoteModel").setValue("");
        this.AddSenctionForm4.get("QuoteFuel").setValue("");
        this.AddSenctionForm5.get("QuoteVariant").setValue("");
        this.AddSenctionForm6.get("QuoteRegistrationYear").setValue("");

        this.GetModel("");
      }
    }
    if (Section == 3) {
      if (this.AddSenctionForm3.invalid) {
        return;
      } else {
        this.isSubmitted = false;

        var fields3 = this.AddSenctionForm3.value;
        this.ModelValue = fields3["QuoteModel"];
        this.Section1 = Section + 1;
        this.AddSenctionForm4.get("QuoteFuel").setValue("");
        this.AddSenctionForm5.get("QuoteVariant").setValue("");
        this.AddSenctionForm6.get("QuoteRegistrationYear").setValue("");
        this.GetFuel("");
      }
    }
    if (Section == 4) {
      if (this.AddSenctionForm4.invalid) {
        return;
      } else {
        this.isSubmitted = false;

        var fields4 = this.AddSenctionForm4.value;
        this.FuelValue = fields4["QuoteFuel"];
        this.Section1 = Section + 1;
        this.AddSenctionForm5.get("QuoteVariant").setValue("");
        this.AddSenctionForm6.get("QuoteRegistrationYear").setValue("");
        this.GetVariant("");
      }
    }
    if (Section == 5) {
      if (this.AddSenctionForm5.invalid) {
        return;
      } else {
        this.isSubmitted = false;

        var fields5 = this.AddSenctionForm5.value;
        this.VariantValue = fields5["QuoteVariant"];

        if (this.GadiType == "new_gadi") {
          this.Section1 = Section + 3;
        } else {
          this.Section1 = Section + 1;
          this.AddSenctionForm6.get("QuoteRegistrationYear").setValue("");
          this.GetRegistrationYear();
        }
      }
    }
    if (Section == 6) {
      if (this.AddSenctionForm6.invalid) {
        return;
      } else {
        this.isSubmitted = false;

        this.Section1 = Section + 1;
        this.GetPreviousInsurer();
      }
    }
    if (Section == 7) {
      if (this.AddSenctionForm7.invalid) {
        return;
      } else {
        this.isSubmitted = false;

        this.Section1 = Section + 1;
      }
    }
    if (Section == 8) {
      if (this.AddSenctionForm8.invalid) {
        return;
      } else {
        this.isSubmitted = false;

        this.Section1 = Section + 1;
        this.GetQuote();
      }
    }
  }

  GetQuote() {
    console.log(this.Section1);
    const formData = new FormData();

    var fields1 = this.AddSenctionForm1.value;
    var fields2 = this.AddSenctionForm2.value;
    var fields3 = this.AddSenctionForm3.value;
    var fields4 = this.AddSenctionForm4.value;
    var fields5 = this.AddSenctionForm5.value;
    var fields6 = this.AddSenctionForm6.value;
    var fields7 = this.AddSenctionForm7.value;
    var fields8 = this.AddSenctionForm8.value;

    console.log(
      fields1,
      fields2,
      fields3,
      fields4,
      fields5,
      fields6,
      fields7,
      fields8
    );
    formData.append(
      "Registration_State_Code",
      fields1["Registration_State_Code"]
    );
    formData.append(
      "Registration_District_Code",
      fields1["Registration_District_Code"]
    );

    if (this.GadiType == "rollower") {
      formData.append(
        "Registration_City_Code",
        fields1["Registration_City_Code"]
      );
      formData.append("Registration_Code", fields1["Registration_Code"]);
      formData.append("RegistrationYear", fields6["QuoteRegistrationYear"]);
      formData.append("PolicyExpiry", fields7["QuotePolicyExpiry"]);
      formData.append("PreviousPolicy", fields7["QuotePreviousPolicy"]);
      formData.append("PreviousInsurer", fields7["QuotePreviousInsurer"]);
      formData.append("DontKnow", fields7["QuoteDontKnow"]);
    }

    formData.append("Make", fields2["QuoteMake"]);
    formData.append("Modal", fields3["QuoteModel"]);
    formData.append("Fuel", fields4["QuoteFuel"]);
    formData.append("Variant", fields5["QuoteVariant"]);

    formData.append("Name", fields8["QuoteName"]);
    formData.append("Mobile", fields8["QuoteMobile"]);
    formData.append("Email", fields8["QuoteEmail"]);
    formData.append("Conditions", fields8["QuoteConditions"]);
    formData.append("Otp", fields8["QuoteMobile"]);
    formData.append("new_gadi", this.GadiType);
    formData.append("type", this.type);

    this.api.IsLoading();
    this.api.HttpPostType("Prequotes/get_quote", formData).then(
      (result) => {
        this.api.HideLoading();

        console.log(result);

        if (result["Status"] == true) {
          this.api.Toast("Success", result["Message"]);

          // alert();
          console.log(encodeURI(result["Quote"]));

          // this.router.navigate(["/quotes/index/"+result["Quote"]]);
          window.location.replace("/quotes/index/" + result["Quote"]);
        } else {
          const msg = "msg";
          this.api.Toast("Warning", result["Message"]);
        }
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

  AutoTabRegistrationNo(input, maxLength, libAutoTab) {
    const length = input.target.value.length;

    if (length >= maxLength && libAutoTab) {
      const field = document.getElementById(libAutoTab);
      if (field) {
        field.focus();
      }
    }
  }

  clickSetValidatiors() {
    const value = this.AddSenctionForm7.get("QuoteDontKnow").value;

    const QuotePolicyExpiry = this.AddSenctionForm7.get("QuotePolicyExpiry");
    const QuotePreviousPolicy = this.AddSenctionForm7.get(
      "QuotePreviousPolicy"
    );
    const QuotePreviousInsurer = this.AddSenctionForm7.get(
      "QuotePreviousInsurer"
    );

    if (value != 1) {
      // alert("no");/

      QuotePolicyExpiry.setValidators(null);
      QuotePreviousPolicy.setValidators(null);
      QuotePreviousInsurer.setValidators(null);
    } else {
      // alert("Yes");
      QuotePolicyExpiry.setValidators([Validators.required]);
      QuotePreviousPolicy.setValidators([Validators.required]);
      QuotePreviousInsurer.setValidators([Validators.required]);
    }
    QuotePolicyExpiry.updateValueAndValidity();
    QuotePreviousPolicy.updateValueAndValidity();
    QuotePreviousInsurer.updateValueAndValidity();
  }
}
