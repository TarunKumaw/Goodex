import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CarInsuranceComponent } from "./products/car-insurance/car-insurance.component";
import { BikeInsuranceComponent } from "./products/bike-insurance/bike-insurance.component";
import { TravelInsuranceComponent } from "./products/travel-insurance/travel-insurance.component";
import { HealthInsuranceComponent } from "./products/health-insurance/health-insurance.component";
import { CorporateInsuranceComponent } from "./products/corporate-insurance/corporate-insurance.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { TermsAndConditionsComponent } from "./terms-and-conditions/terms-and-conditions.component";
import { LegalPoliciesComponent } from "./legal-policies/legal-policies.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "car-insurance", component: CarInsuranceComponent },
  { path: "bike-insurance", component: BikeInsuranceComponent },
  { path: "health-insurance", component: HealthInsuranceComponent },
  { path: "travel-insurance", component: TravelInsuranceComponent },
  { path: "corporate-insurance", component: CorporateInsuranceComponent },
  { path: "privacy-policy", component: PrivacyPolicyComponent },
  { path: "terms-and-conditions", component: TermsAndConditionsComponent },
  { path: "legal-policies", component: LegalPoliciesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
