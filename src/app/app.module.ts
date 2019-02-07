import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule, MatButtonModule, MatSidenavModule, MatListModule, MatIconModule,MatCardModule,MatMenuModule,MatFormFieldModule,MatDatepickerModule,
  MatNativeDateModule,MatSelectModule,MatOptionModule,MatSlideToggleModule} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { HomeComponent } from './consumeroverview/home/home.component';
import { OfficebuildingComponent } from './consumeroverview/officebuilding/officebuilding.component';
import { EnergyChartComponent } from './energy-chart/energy-chart.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatRadioModule} from '@angular/material/radio';
import { MatInputModule} from '@angular/material/input';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {DateFormatPipe} from './dateFormatPipe';
import { SolverComponent } from './solver/solver.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {  MatPaginatorModule, 
  MatSortModule, MatTableModule } from "@angular/material";
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    BatterieComponent,
    PricesComponent,
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
    EnergyChartComponent,
    SolverComponent
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
    MatCardModule,
    MatDatepickerModule,
    DpDatePickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    LeafletModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
MatProgressSpinnerModule
  ],
  exports: [  
    MatButtonModule,  
    MatMenuModule,  
    MatToolbarModule,  
    MatIconModule,  
    MatCardModule,  
    BrowserAnimationsModule,  
    MatFormFieldModule,  
    MatInputModule,  
    MatDatepickerModule,  
    MatNativeDateModule,  
    MatRadioModule,  
    MatSelectModule,  
    MatOptionModule,  
    MatSlideToggleModule  
  ], 
  providers: [DateFormatPipe],
  bootstrap: [AppComponent]
})

export class AppModule { }
