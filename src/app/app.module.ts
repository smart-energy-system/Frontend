import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule, MatButtonModule, MatSidenavModule, MatListModule, MatIconModule} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsumerComponent } from './consumeroverview/consumer/consumer.component';
import { BatterieComponent } from './batterieoverview/batterie/batterie.component';
import { PricesComponent } from './prices/prices.component';
import { SupplieroverviewComponent } from './supplieroverview/supplieroverview.component';
import { NewsupplierComponent } from './supplieroverview/newsupplier/newsupplier.component';
import { ConsumeroverviewComponent } from './consumeroverview/consumeroverview.component';
import { NewconsumerComponent } from './consumeroverview/newconsumer/newconsumer.component';
import { BatterieoverviewComponent } from './batterieoverview/batterieoverview.component';
import { NewbatterieComponent } from './batterieoverview/newbatterie/newbatterie.component';
import { WindturbineComponent } from './supplieroverview/windturbine/windturbine.component';
import { PhotovoltaicpanelComponent } from './supplieroverview/photovoltaicpanel/photovoltaicpanel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    ConsumerComponent,
    BatterieComponent,
    PricesComponent,
    SupplieroverviewComponent,
    NewsupplierComponent,
    ConsumeroverviewComponent,
    NewconsumerComponent,
    BatterieoverviewComponent,
    NewbatterieComponent,
    WindturbineComponent,
    PhotovoltaicpanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //material
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
