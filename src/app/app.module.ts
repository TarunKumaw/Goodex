import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { AppRoutingModule } from "./app-routing.module";
import { PagesModule } from "./pages/pages.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./common/header/header.component";
import { FooterComponent } from "./common/footer/footer.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { ApiService } from "./providers/api.service";
import { HttpClientModule } from "@angular/common/http";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { environment } from "../environments/environment";
import { DataTablesModule } from "angular-datatables";
 import { CKEditorModule } from "ckeditor4-angular";
import { AboutModule } from "./about/about.module";
import { PrequotesModule } from "./prequotes/prequotes.module";
import { OwlModule } from "ngx-owl-carousel";
 import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BsDatepickerModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    TimepickerModule.forRoot(),
    ToastrModule.forRoot(),
    PagesModule,
    AboutModule,
    PrequotesModule,
    OwlModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CKEditorModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule,
    NgSelectModule
    // NgForOfContext,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiService, NgxSpinnerService],
  entryComponents: [],

  bootstrap: [AppComponent],
})
export class AppModule {}
