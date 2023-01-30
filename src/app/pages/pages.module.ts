import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { MatDialogModule } from "@angular/material/dialog";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PagesRoutingModule } from "./pages-routing.module";

import { DashboardComponent } from "./dashboard/dashboard.component";
 import { BecomePosComponent } from './become-pos/become-pos.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CarInsuranceComponent } from './products/car-insurance/car-insurance.component';
import { BikeInsuranceComponent } from './products/bike-insurance/bike-insurance.component';
import { TravelInsuranceComponent } from './products/travel-insurance/travel-insurance.component';
import { HealthInsuranceComponent } from './products/health-insurance/health-insurance.component';
import { CorporateInsuranceComponent } from './products/corporate-insurance/corporate-insurance.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { LegalPoliciesComponent } from './legal-policies/legal-policies.component';



@NgModule({
  declarations: [DashboardComponent,BecomePosComponent,ContactUsComponent, CarInsuranceComponent, BikeInsuranceComponent, TravelInsuranceComponent, HealthInsuranceComponent, CorporateInsuranceComponent, PrivacyPolicyComponent, TermsAndConditionsComponent, LegalPoliciesComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    DataTablesModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  entryComponents: [],
})
export class PagesModule {}
