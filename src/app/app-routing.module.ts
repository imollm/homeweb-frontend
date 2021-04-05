import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactComponent } from './components/contact/contact.component';
import { ResultsComponent } from './components/results/results.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CategoryComponent } from './components/category/category.component';
import {PropertyComponent} from './components/property/property.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'home', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'property/:id', component: PropertyComponent },
  { path: 'aboutus', component:  AboutusComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
