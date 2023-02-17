import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alexbarker-home';

  public navOpened = false;

  public toggleNav()  {
    this.navOpened = this.navOpened ? false : true;
  }
}
