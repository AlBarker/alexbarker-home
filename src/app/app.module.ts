import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HottestBurn100Component } from './hottest-burn100/hottest-burn100.component';
import { Countdown2022Component } from './hottest-burn100/countdown2022/countdown2022.component';
import { OrdinalPipe } from './pipes/ordinal.pipe';
import { AboutComponent } from './about/about.component';
import { BrickbreakerComponent } from './brickbreaker/brickbreaker.component';
import { Countdown2021Component } from './hottest-burn100/countdown2021/countdown2021.component';
import { Countdown2020Component } from './hottest-burn100/countdown2020/countdown2020.component';
import { Countdown2019Component } from './hottest-burn100/countdown2019/countdown2019.component';
import { Countdown2018Component } from './hottest-burn100/countdown2018/countdown2018.component';
import { Countdown2017Component } from './hottest-burn100/countdown2017/countdown2017.component';

@NgModule({
  declarations: [
    AppComponent,
    HottestBurn100Component,
    Countdown2022Component,
    Countdown2021Component,
    Countdown2020Component,
    Countdown2019Component,
    Countdown2018Component,
    Countdown2017Component,
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
