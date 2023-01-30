import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutUsComponent } from "./about/about-us/about-us.component";
import { BecomePosComponent } from "./pages/become-pos/become-pos.component";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";
import { PrequotesComponent } from "./prequotes/prequotes/prequotes.component";

const routes: Routes = [
  {
    path: "about",
    component: AboutUsComponent,
  },
  {
    path: "become-pos",
    component: BecomePosComponent,
  },
  {
    path: "contact-us",
    component: ContactUsComponent,
  },

  { path: "prequotes/:Quotation", component: PrequotesComponent },
  {
    path: "products",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
// Website-section/View-posters
