import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule, MatButtonModule, MatSidenavModule, MatListModule, MatIconModule} from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BatterieComponent } from './batterieoverview/batterie/batterie.component';
import { ChartComponent } from './prices/chart/chart.component';
import { PricesComponent } from './prices/prices.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SupplieroverviewComponent } from './supplieroverview/supplieroverview.component';
import { NewsupplierComponent } from './supplieroverview/newsupplier/newsupplier.component';
import { ConsumeroverviewComponent } from './consumeroverview/consumeroverview.component';
import { NewconsumerComponent } from './consumeroverview/newconsumer/newconsumer.component';
import { BatterieoverviewComponent } from './batterieoverview/batterieoverview.component';
import { NewbatterieComponent } from './batterieoverview/newbatterie/newbatterie.component';
import { WindturbineComponent } from './supplieroverview/windturbine/windturbine.component';
import { PhotovoltaicpanelComponent } from './supplieroverview/photovoltaicpanel/photovoltaicpanel.component';
import { HomeComponent } from './consumeroverview/home/home.component';
import { OfficebuildingComponent } from './consumeroverview/officebuilding/officebuilding.component';
import { EnergyChartComponent } from './energy-chart/energy-chart.component';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { MatRadioModule} from '@angular/material/radio';
import { MatInputModule} from '@angular/material/input';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {DateFormatPipe} from './dateFormatPipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    BatterieComponent,
    PricesComponent,
    ChartComponent,
    SupplieroverviewComponent,
    NewsupplierComponent,
    ConsumeroverviewComponent,
    NewconsumerComponent,
    BatterieoverviewComponent,
    NewbatterieComponent,
    WindturbineComponent,
    PhotovoltaicpanelComponent,
    HomeComponent,
    OfficebuildingComponent,
    EnergyChartComponent
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
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    MatExpansionModule,
    MatCheckboxModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    LeafletModule.forRoot()
  ],
  providers: [DateFormatPipe],
  bootstrap: [AppComponent]
})

export class AppModule { }
