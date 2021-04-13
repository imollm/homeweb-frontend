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

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'home', component: HomeComponent},
      {path: 'properties', component: PropertiesComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'cities', component: CitiesComponent},
      {path: 'countries', component: CountriesComponent},
      {path: 'sales', component: SalesComponent},
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
