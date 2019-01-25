import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SupplierComponent } from './supplieroverview/supplier/supplier.component';
import { ConsumerComponent } from './consumeroverview/consumer/consumer.component';
import { BatterieComponent } from './batterieoverview/batterie/batterie.component';
import { PricesComponent } from './prices/prices.component';
import { SupplieroverviewComponent} from './supplieroverview/supplieroverview.component';
import { NewsupplierComponent } from './supplieroverview/newsupplier/newsupplier.component';
import { NewconsumerComponent } from './consumeroverview/newconsumer/newconsumer.component';
import { ConsumeroverviewComponent } from './consumeroverview/consumeroverview.component';
import { BatterieoverviewComponent } from './batterieoverview/batterieoverview.component';
import { NewbatterieComponent } from './batterieoverview/newbatterie/newbatterie.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'supplier',
    component: SupplieroverviewComponent,
    children:[{
      path: 'new',
      component: NewsupplierComponent,
    },{
      path: ':id',
      component: SupplierComponent,
    }]
  },
  {path: 'consumer',
    component: ConsumeroverviewComponent,
    children:[{
      path: 'new',
      component: NewconsumerComponent,
    },{
      path: ':id',
      component: ConsumerComponent,
    }]
  },
  {path: 'batterie', component: BatterieoverviewComponent,
    children:[{
      path: 'new',
      component: NewbatterieComponent,
    },{
      path: ':id',
      component: BatterieComponent,
    }]
  },
  {path: 'prices', component: PricesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
