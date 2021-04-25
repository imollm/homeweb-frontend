import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from '../components/not-found/not-found.component';
import {PropertiesComponent} from './components/resources/properties/properties.component';
import {CategoriesComponent} from './components/resources/categories/categories.component';
import {CitiesComponent} from './components/resources/cities/cities.component';
import {CountriesComponent} from './components/resources/countries/countries.component';
import {SalesComponent} from './components/resources/sales/sales.component';
import {ToursComponent} from './components/resources/tours/tours.component';
import {PropertiesCreateComponent} from './components/resources/properties/forms/createdit/properties-create.component';
import {PropertyDetailsComponent} from './components/resources/properties/details/property-details.component';
import {CategoriesCreateComponent} from './components/resources/categories/forms/createdit/categories-create.component';
import {CategoryDetailsComponent} from './components/resources/categories/details/category-details.component';
import {CountryDetailsComponent} from './components/resources/countries/details/country-details.component';
import {CountriesCreateComponent} from './components/resources/countries/forms/createdit/countries-create.component';
import {CityDetailsComponent} from './components/resources/cities/details/city-details.component';
import { CitiesCreateComponent } from './components/resources/cities/forms/createdit/cities-create.component';
import {ToursCreateComponent} from './components/resources/tours/forms/createdit/tours-create.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'home', component: HomeComponent},
      {path: 'properties', component: PropertiesComponent},
      {path: 'properties/create', component: PropertiesCreateComponent},
      {path: 'properties/details/:id', component: PropertyDetailsComponent},
      {path: 'properties/edit/:id', component: PropertiesCreateComponent},
      {path: 'properties/delete/:id', component: PropertiesComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'categories/create', component: CategoriesCreateComponent},
      {path: 'categories/details/:id', component: CategoryDetailsComponent},
      {path: 'categories/edit/:id', component: CategoriesCreateComponent},
      {path: 'categories/delete/:id', component: CategoriesComponent},
      {path: 'cities', component: CitiesComponent},
      {path: 'cities/create', component: CitiesCreateComponent},
      {path: 'cities/details/:id', component: CityDetailsComponent},
      {path: 'cities/edit/:id', component: CitiesCreateComponent},
      {path: 'cities/delete/:id', component: CitiesComponent},
      {path: 'countries', component: CountriesComponent},
      {path: 'countries/create', component: CountriesCreateComponent},
      {path: 'countries/details/:id', component: CountryDetailsComponent},
      {path: 'countries/edit/:id', component: CountriesCreateComponent},
      {path: 'countries/delete/:id', component: CountriesComponent},
      {path: 'sales', component: SalesComponent},
      {path: 'tours', component: ToursComponent},
      {path: 'tours/create', component: ToursCreateComponent},
      {path: 'tours/edit/:id', component: ToursCreateComponent},
      {path: '**', component: NotFoundComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
