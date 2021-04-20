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
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '../_alert/alert.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgToggleModule } from 'ngx-toggle-button';

// Common components of AppModule and DashboardModule
import { SharedModule } from '../shared/shared.module';

import { PropertiesComponent } from './components/resources/properties/properties.component';
import { PropertiesAdminComponent } from './components/resources/properties/admin/properties-admin.component';
import { PropertiesCustomerComponent } from './components/resources/properties/customer/properties-customer.component';
import { PropertiesEmployeeComponent } from './components/resources/properties/employee/properties-employee.component';
import { PropertiesOwnerComponent } from './components/resources/properties/owner/properties-owner.component';

import { CategoriesComponent } from './components/resources/categories/categories.component';
import { CategoriesAdminComponent } from './components/resources/categories/admin/categories-admin.component';
import { CategoriesEmployeeComponent } from './components/resources/categories/employee/categories-employee.component';

import { CitiesComponent } from './components/resources/cities/cities.component';
import { CitiesAdminComponent } from './components/resources/cities/admin/cities-admin.component';

import { CountriesComponent } from './components/resources/countries/countries.component';
import { CountriesAdminComponent } from './components/resources/countries/admin/countries-admin.component';

import { SalesComponent } from './components/resources/sales/sales.component';
import { SalesAdminComponent } from './components/resources/sales/admin/sales-admin.component';
import { SalesEmployeeComponent } from './components/resources/sales/employee/sales-employee.component';

import { ToursComponent } from './components/resources/tours/tours.component';
import { ToursAdminComponent } from './components/resources/tours/admin/tours-admin.component';
import { ToursCustomerComponent } from './components/resources/tours/customer/tours-customer.component';
import { ToursEmployeeComponent } from './components/resources/tours/employee/tours-employee.component';
import { PropertiesCreateComponent } from './components/resources/properties/forms/createdit/properties-create.component';
import { PropertyDetailsComponent } from './components/resources/properties/details/property-details.component';
import { CategoriesCreateComponent } from './components/resources/categories/forms/createdit/categories-create.component';
import { CategoryDetailsComponent } from './components/resources/categories/details/category-details.component';
import { CountriesEmployeeComponent } from './components/resources/countries/employee/countries-employee.component';

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
    PropertiesCreateComponent,
    CategoriesComponent,
    CategoriesAdminComponent,
    CategoriesEmployeeComponent,
    CitiesComponent,
    CitiesAdminComponent,
    CountriesComponent,
    CountriesAdminComponent,
    SalesComponent,
    SalesAdminComponent,
    SalesEmployeeComponent,
    ToursComponent,
    ToursAdminComponent,
    ToursCustomerComponent,
    ToursEmployeeComponent,
    PropertyDetailsComponent,
    CategoriesCreateComponent,
    CategoryDetailsComponent,
    CountriesEmployeeComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FontAwesomeModule,
        ChartsModule,
        ReactiveFormsModule,
        AlertModule,
        NgbModule,
        SharedModule,
        NgToggleModule
    ]
})
export class DashboardModule { }
