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
import {PropertiesCreateComponent} from './components/resources/properties/forms/create/properties-create.component';
import {PropertyDetailsComponent} from './components/resources/properties/details/property-details.component';

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
      {path: 'categories', component: CategoriesComponent},
      {path: 'cities', component: CitiesComponent},
      {path: 'countries', component: CountriesComponent},
      {path: 'sales', component: SalesComponent},
      {path: 'tours', component: ToursComponent},
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
