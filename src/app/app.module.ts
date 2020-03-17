import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddNewTransactionComponent } from './add-new-transaction/add-new-transaction.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from "@angular/material/icon";
import {HttpClientModule} from '@angular/common/http';
// import { ChartsModule } from 'ng2-charts';
import {MatDialogModule} from '@angular/material/dialog';
import { ReceiptUploadComponent } from './receipt-upload/receipt-upload.component';
import { DataTableModule } from 'ng-angular8-datatable';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';
import { HomeComponent } from './home/home.component';
import {ClientViewComponent } from './client-view/client-view.component';
import { RadmusUserComponent } from './radmus-user/radmus-user.component';
import { AddShopComponent } from './add-shop/add-shop.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AddTransaction1Component } from './add-transaction1/add-transaction1.component';
import { ParentComponent } from './shopping-cart/parent.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PaymentShoppingCartComponent } from './shopping-cart/payment.shopping-cart.component';
import { PostgresComponent } from './postgres/postgres.component';
import { RamanComponent } from './raman/raman.component';
import {MatTableModule,} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    ClientViewComponent,
    RadmusUserComponent,
    LoginComponent,
    AddNewTransactionComponent,
    ViewTransactionComponent,
    ReceiptUploadComponent,
    BulkuploadComponent,
    HomeComponent,
    AddShopComponent,
    AddTransaction1Component,
    ParentComponent,
    ShoppingCartComponent,
    PaymentShoppingCartComponent,
     PostgresComponent,
     RamanComponent   
    
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatInputModule,
    MatIconModule,
    HttpClientModule, 
    MatDialogModule,
    MatRadioModule,
    DataTableModule,
    Ng2SearchPipeModule,
    MDBBootstrapModule.forRoot(),
   MatTableModule,
    MatPaginatorModule,
    MatSortModule,
MatAutocompleteModule
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
