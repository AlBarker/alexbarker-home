import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HottestBurn100Component } from './hottest-burn100/hottest-burn100.component';
import { Countdown2022Component } from './hottest-burn100/countdown2022/countdown2022.component';
import { OrdinalPipe } from './pipes/ordinal.pipe';
import { AboutComponent } from './about/about.component';
import { BrickbreakerComponent } from './brickbreaker/brickbreaker.component';

@NgModule({
  declarations: [
    AppComponent,
    HottestBurn100Component,
    Countdown2022Component,
    OrdinalPipe,
    AboutComponent,
    BrickbreakerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
