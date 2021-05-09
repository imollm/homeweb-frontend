import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { AdminComponent } from './components/home/admin/admin.component';
import { EmployeeComponent } from './components/home/employee/employee.component';
import { CustomerComponent } from './components/home/customer/customer.component';
import { OwnerComponent } from './components/home/owner/owner.component';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '../services/_alert/alert.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgToggleModule } from 'ngx-toggle-button';

// Common components of AppModule and DashboardModule
import { SharedModule } from '../shared/shared.module';

import { PropertiesComponent } from './components/resources/properties/properties.component';
import { PropertiesAdminEmployeeComponent } from './components/resources/properties/admin-employee/properties-admin-employee.component';
import { PropertiesCustomerComponent } from './components/resources/properties/customer/properties-customer.component';
import { PropertiesOwnerComponent } from './components/resources/properties/owner/properties-owner.component';

import { CategoriesComponent } from './components/resources/categories/categories.component';
import { CategoriesAdminEmployeeComponent } from './components/resources/categories/admin-employee/categories-admin-employee.component';

import { CitiesComponent } from './components/resources/cities/cities.component';
import { CitiesAdminComponent } from './components/resources/cities/admin/cities-admin.component';

import { CountriesComponent } from './components/resources/countries/countries.component';
import { CountriesAdminComponent } from './components/resources/countries/admin/countries-admin.component';

import { SalesComponent } from './components/resources/sales/sales.component';
import { SalesAdminEmployeeComponent } from './components/resources/sales/admin-employee/sales-admin-employee.component';

import { ToursAdminEmployeeCustomerComponent } from './components/resources/tours/admin-employee-customer/tours-admin-employee-customer.component';
import { ToursOwnerComponent } from './components/resources/tours/owner/tours-owner.component';
import { ToursCreateComponent } from './components/resources/tours/forms/createdit/tours-create.component';
import { TourDetailsComponent } from './components/resources/tours/details/tour-details.component';

import { PropertiesCreateComponent } from './components/resources/properties/forms/createdit/properties-create.component';
import { PropertyDetailsComponent } from './components/resources/properties/details/property-details.component';

import { CategoriesCreateComponent } from './components/resources/categories/forms/createdit/categories-create.component';
import { CategoryDetailsComponent } from './components/resources/categories/details/category-details.component';

import { CountryDetailsComponent } from './components/resources/countries/details/country-details.component';
import { CountriesCreateComponent } from './components/resources/countries/forms/createdit/countries-create.component';

import { CityDetailsComponent } from './components/resources/cities/details/city-details.component';
import { CitiesCreateComponent } from './components/resources/cities/forms/createdit/cities-create.component';
import { SalesCreateComponent } from './components/resources/sales/forms/createdit/sales-create.component';
import { SaleDetailsComponent } from './components/resources/sales/details/sale-details.component';
import { FeaturesComponent } from './components/resources/features/features.component';
import { FeaturesAdminComponent } from './components/resources/features/admin/features-admin.component';
import { FeaturesCreateComponent } from './components/resources/features/forms/createdit/features-create.component';
import { PricesComponent } from './components/resources/prices/prices.component';
import { PricesAdminComponent } from './components/resources/prices/admin/prices-admin.component';
import { PricesEmployeeComponent } from './components/resources/prices/employee/prices-employee.component';
import { PricesOwnerComponent } from './components/resources/prices/owner/prices-owner.component';
import { PricesCreateComponent } from './components/resources/prices/forms/create/prices-create.component';
import {ToursComponent} from './components/resources/tours/tours.component';
import { PurchasesCustomerComponent } from './components/resources/sales/customer/purchases-customer.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    CardComponent,
    AdminComponent,
    EmployeeComponent,
    CustomerComponent,
    OwnerComponent,
    PropertiesComponent,
    PropertiesAdminEmployeeComponent,
    PropertiesCustomerComponent,
    PropertiesOwnerComponent,
    PropertiesCreateComponent,
    CategoriesComponent,
    CategoriesAdminEmployeeComponent,
    CitiesComponent,
    CitiesAdminComponent,
    CountriesComponent,
    CountriesAdminComponent,
    SalesComponent,
    SalesAdminEmployeeComponent,
    ToursComponent,
    ToursAdminEmployeeCustomerComponent,
    PropertyDetailsComponent,
    CategoriesCreateComponent,
    CategoryDetailsComponent,
    CountryDetailsComponent,
    CountriesCreateComponent,
    CityDetailsComponent,
    CitiesCreateComponent,
    ToursOwnerComponent,
    ToursCreateComponent,
    TourDetailsComponent,
    SalesCreateComponent,
    SaleDetailsComponent,
    FeaturesComponent,
    FeaturesAdminComponent,
    FeaturesCreateComponent,
    PricesComponent,
    PricesAdminComponent,
    PricesEmployeeComponent,
    PricesOwnerComponent,
    PricesCreateComponent,
    PurchasesCustomerComponent
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
