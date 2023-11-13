import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PurchaseComponent } from './home/components/purchase/purchase.component';
import { TuneYourVehiculeComponent } from './home/components/tune-your-vehicule/tune-your-vehicule.component';
import {FormsModule} from "@angular/forms";
import {ClipboardModule} from "ngx-clipboard";

@NgModule({
  declarations: [AppComponent, TuneYourVehiculeComponent, PurchaseComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ClipboardModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
