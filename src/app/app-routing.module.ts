import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './consumeroverview/home/home.component';
import { OfficebuildingComponent } from './consumeroverview/officebuilding/officebuilding.component';
import { BatterieComponent } from './batterieoverview/batterie/batterie.component';
import { PricesComponent } from './prices/prices.component';
import { SupplieroverviewComponent} from './supplieroverview/supplieroverview.component';
import { NewsupplierComponent } from './supplieroverview/newsupplier/newsupplier.component';
import { NewconsumerComponent } from './consumeroverview/newconsumer/newconsumer.component';
import { ConsumeroverviewComponent } from './consumeroverview/consumeroverview.component';
import { BatterieoverviewComponent } from './batterieoverview/batterieoverview.component';
import { NewbatterieComponent } from './batterieoverview/newbatterie/newbatterie.component';
import { WindturbineComponent } from './supplieroverview/windturbine/windturbine.component';
import { PhotovoltaicpanelComponent } from './supplieroverview/photovoltaicpanel/photovoltaicpanel.component';
import { SolverComponent } from './solver/solver.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'supplier',
    component: SupplieroverviewComponent,
    children:[{
      path: 'new',
      component: NewsupplierComponent,
    },{
      path: 'photovoltaicPanels/:id',
      component: PhotovoltaicpanelComponent,
    },{
      path: 'windTurbines/:id',
      component: WindturbineComponent,
    }]
  },
  {path: 'consumer',
    component: ConsumeroverviewComponent,
    children:[{
      path: 'new',
      component: NewconsumerComponent,
    },{
      path: 'homes/:id',
      component: HomeComponent,
    },{
      path: 'officeBuildings/:id',
      component: OfficebuildingComponent,
    }]
  },
  {path: 'batteries', component: BatterieoverviewComponent,
    children:[{
      path: 'new',
      component: NewbatterieComponent,
    },{
      path: ':id',
      component: BatterieComponent,
    }]
  },
  {path: 'prices', component: PricesComponent},
  {path: 'solver', component: SolverComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
