import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { Countdown2017Component } from './hottest-burn100/countdown2017/countdown2017.component';
import { Countdown2018Component } from './hottest-burn100/countdown2018/countdown2018.component';
import { Countdown2019Component } from './hottest-burn100/countdown2019/countdown2019.component';
import { Countdown2020Component } from './hottest-burn100/countdown2020/countdown2020.component';
import { Countdown2021Component } from './hottest-burn100/countdown2021/countdown2021.component';
import { Countdown2022Component } from './hottest-burn100/countdown2022/countdown2022.component';
import { HottestBurn100Component } from './hottest-burn100/hottest-burn100.component';
import { BrickbreakerComponent } from './brickbreaker/brickbreaker.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'hottest-burn100', component: HottestBurn100Component },
  { path: 'brickbreaker', component: BrickbreakerComponent },
  { path: 'hottest-burn100/2022', component: Countdown2022Component },
  { path: 'hottest-burn100/2021', component: Countdown2021Component },
  { path: 'hottest-burn100/2020', component: Countdown2020Component },
  { path: 'hottest-burn100/2019', component: Countdown2019Component },
  { path: 'hottest-burn100/2018', component: Countdown2018Component },
  { path: 'hottest-burn100/2017', component: Countdown2017Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
