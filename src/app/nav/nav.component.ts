import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  menu: any;
  body: any;
  constructor() {
      this.body = document.getElementsByClassName("js-body")
  }

  ngOnInit() {
  }

  toggle($event){
      $event.preventDefault();
      if(this.body[0].classList.contains('is-activeNav')) {
           this.body[0].classList.remove("is-activeNav");
      }else {
           this.body[0].classList.add("is-activeNav");
      }
  }
}
