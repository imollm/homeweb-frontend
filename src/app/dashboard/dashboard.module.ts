import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { TableComponent } from './components/table/table.component';
import { CardComponent } from './components/card/card.component';
import { AdminComponent } from './components/home/admin/admin.component';
import { EmployeeComponent } from './components/home/employee/employee.component';
import { CustomerComponent } from './components/home/customer/customer.component';
import { OwnerComponent } from './components/home/owner/owner.component';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    TableComponent,
    CardComponent,
    AdminComponent,
    EmployeeComponent,
    CustomerComponent,
    OwnerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    ChartsModule
  ]
})
export class DashboardModule { }
