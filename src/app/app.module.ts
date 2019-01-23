import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule, MatButtonModule} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { BatteriesComponent } from './batteries/batteries.component';
import { PricesComponent } from './prices/prices.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    SupplierComponent,
    ConsumerComponent,
    BatteriesComponent,
    PricesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //material
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
