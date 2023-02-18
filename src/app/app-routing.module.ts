import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { Countdown2022Component } from './hottest-burn100/countdown2022/countdown2022.component';
import { HottestBurn100Component } from './hottest-burn100/hottest-burn100.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'hottest-burn100', component: HottestBurn100Component },
  { path: 'hottest-burn100/countdown2022', component: Countdown2022Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
