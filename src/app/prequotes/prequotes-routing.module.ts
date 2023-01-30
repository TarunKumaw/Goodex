import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotesComponent } from './quotes/quotes.component';
import { ProposalComponent } from './proposal/proposal.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';

const routes: Routes = [
  {
    path: "quotes/index/:quotation",
    component: QuotesComponent,
  }, {
    path: "proposal/:company/:quotation",
    component:  ProposalComponent,
  },
  {
    path: "review-pay/:quotation",
    component:  ReviewPageComponent,
  },
  {
    path: "payment/:status/:quotation",
    component:  PaymentPageComponent,
  }

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrequotesRoutingModule { }
