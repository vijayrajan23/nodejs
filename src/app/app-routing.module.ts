import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { HomeComponent } from './home/home.component';
import {RegisterComponent } from './register/register.component';
import {LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AddNewTransactionComponent } from './add-new-transaction/add-new-transaction.component';
import { ReceiptUploadComponent } from './receipt-upload/receipt-upload.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';
import {ClientViewComponent } from './client-view/client-view.component';
import { RadmusUserComponent } from './radmus-user/radmus-user.component';
import { AddShopComponent } from './add-shop/add-shop.component';

import { AddTransaction1Component } from './add-transaction1/add-transaction1.component';
import { ParentComponent } from './shopping-cart/parent.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PaymentShoppingCartComponent } from './shopping-cart/payment.shopping-cart.component';
import { PostgresComponent } from './postgres/postgres.component';
import { RamanComponent } from './raman/raman.component';


const routes: Routes = [
       { path: '', component: LoginComponent, pathMatch: 'full' , canActivate: [AuthGuard]},
      { path:'login',component: LoginComponent },
      { path:'register',component: RegisterComponent },
      { path:'receipt_upload',component: ReceiptUploadComponent },
      { path:'add_transaction',component: AddNewTransactionComponent },
      { path:'add_shop',component: AddShopComponent },
      { path:'view_trans',component: ViewTransactionComponent },
      { path:'bulkupload',component: BulkuploadComponent },
      { path:'clientview',component: ClientViewComponent },
      { path:'radmus-users',component: RadmusUserComponent },
      { path:'large',component: RamanComponent },
      { path:'cart-user',component: AddTransaction1Component },
      { path:'postgres',component: PostgresComponent },

      { path:'parent',component: ParentComponent,
        children:[
          { path:'hh',component:PaymentShoppingCartComponent  },
          {path:'shopping-cart',component: ShoppingCartComponent},
        ]
      },
      { path:'home',component: HomeComponent, canActivate: [AuthGuard]}
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
