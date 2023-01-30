import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { MatDialogModule } from "@angular/material/dialog";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

import { PrequotesRoutingModule } from './prequotes-routing.module';
import { PrequotesComponent } from './prequotes/prequotes.component';
// import { NgSelectModule } from "@ng-select/ng-select";
import { QuotesComponent } from './quotes/quotes.component';
import { ProposalComponent } from './proposal/proposal.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaymentPageComponent } from './payment-page/payment-page.component';


@NgModule({
  declarations: [PrequotesComponent, QuotesComponent,ProposalComponent, ReviewPageComponent, PaymentPageComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    DataTablesModule,
    PrequotesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,NgSelectModule
  ]
})
export class PrequotesModule { }
