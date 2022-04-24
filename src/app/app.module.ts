import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Dadi5Component } from './dadi5/dadi5.component';
import { Dadi2giocComponent } from './dadi2gioc/dadi2gioc.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AnimaliComponent } from './animali/animali.component';
import { ChiamalocComponent } from './chiamaloc/chiamaloc.component';
import { HttpClientModule } from '@angular/common/http';


const LISTA_ROUTES = [
    {path: "", component: LoginComponent},
    {path: "login", component: LoginComponent},
    {path: "dadi", component: Dadi2giocComponent},
    {path: "animali", component: AnimaliComponent},
    {path: "canada", component: ChiamalocComponent}
  ]


@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(LISTA_ROUTES) ],
  declarations: [ AppComponent, Dadi5Component, Dadi2giocComponent, LoginComponent, MenuComponent, AnimaliComponent, ChiamalocComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
