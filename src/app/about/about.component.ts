import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor (private renderer: Renderer2) {

  }

  public toggleDetails(e : any, id: string) {
    var detailsElement = document.getElementById(id);

    if (!detailsElement) {
      return;
    }

    var posx = 0;
    var posy = 0;
    if (!e) e = window.event;

    detailsElement.style.display === 'none' ? 
    this.renderer.setStyle(detailsElement, 'display', 'block') : 
    this.renderer.setStyle(detailsElement, 'display', 'none');

    if (e.pageX || e.pageY)
    {
        posx = Math.min(e.pageX, window.innerWidth - detailsElement.offsetWidth );
        posy = Math.min(e.pageY, window.innerHeight - detailsElement.offsetHeight);
        debugger;
    }
    else if (e.clientX || e.clientY)
    {
        posx = e.clientX;
        posy = e.clientY;
    }
    this.renderer.setStyle(detailsElement, 'left', `${posx}px`);
    this.renderer.setStyle(detailsElement, 'top', `${posy}px`);

    console.log(e);
  }

}
