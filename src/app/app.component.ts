import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent  implements AfterViewInit   {
  title = 'app';


  ngOnInit() {
      this.title = 'has changed';
    //  window.setTimeout(this.fade(), 100)

  }

  ngAfterViewInit() {
     this.fade()
   }

  fade() {

    let fadein = document.getElementsByClassName("js-fade");
    let array = Array.from(fadein);
      array.map((item) =>{
        item.classList.add('fading');
      });
  }
}
