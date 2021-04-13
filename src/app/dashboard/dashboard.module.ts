import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { TableComponent } from './components/table/table.component';
import { CardComponent } from './components/card/card.component';
import { AdminComponent } from './components/home/admin/admin.component';
import { EmployeeComponent } from './components/home/employee/employee.component';
import { CustomerComponent } from './components/home/customer/customer.component';
import { OwnerComponent } from './components/home/owner/owner.component';
import { ChartsModule } from 'ng2-charts';

import { PropertiesComponent } from './components/resources/properties/properties.component';
import { PropertiesAdminComponent } from './components/resources/properties/admin/properties-admin.component';
import { PropertiesCustomerComponent } from './components/resources/properties/customer/properties-customer.component';
import { PropertiesEmployeeComponent } from './components/resources/properties/employee/properties-employee.component';
import { PropertiesOwnerComponent } from './components/resources/properties/owner/properties-owner.component';

import { CategoriesComponent } from './components/resources/categories/categories.component';
import { CategoriesAdminComponent } from './components/resources/categories/admin/categories-admin.component';
import { CategoriesEmployeeComponent } from './components/resources/categories/employee/categories-employee.component';

import { CitiesComponent } from './components/resources/cities/cities.component';
import { CountriesComponent } from './components/resources/countries/countries.component';
import { SalesComponent } from './components/resources/sales/sales.component';
import { ToursComponent } from './components/resources/tours/tours.component';

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
    OwnerComponent,
    PropertiesComponent,
    PropertiesAdminComponent,
    PropertiesCustomerComponent,
    PropertiesEmployeeComponent,
    PropertiesOwnerComponent,
    CategoriesComponent,
    CategoriesAdminComponent,
    CategoriesEmployeeComponent,
    CitiesComponent,
    CountriesComponent,
    SalesComponent,
    ToursComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    ChartsModule
  ]
})
export class DashboardModule { }
