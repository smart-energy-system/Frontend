import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SupplierComponent } from './supplieroverview/supplier/supplier.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { BatteriesComponent } from './batteries/batteries.component';
import { PricesComponent } from './prices/prices.component';
import { SupplieroverviewComponent} from './supplieroverview/supplieroverview.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'supplier',
    component: SupplieroverviewComponent,
    children:[{
      path: ':id',
      component: SupplierComponent,
    }]
  },
  {path: 'consumer', component: ConsumerComponent},
  {path: 'batteries', component: BatteriesComponent},
  {path: 'prices', component: PricesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
