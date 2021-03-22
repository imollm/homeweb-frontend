import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultsComponent } from './components/results/results.component';
import { SearcherComponent } from './components/layouts/searcher/searcher.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AuthGuard} from "./auth/auth.guard";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesComponent,
    ContactComponent,
    AboutusComponent,
    ResultsComponent,
    SearcherComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
