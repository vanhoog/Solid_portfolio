import { Component, OnInit } from '@angular/core';
declare var require: any;


@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.css']
})
export class PortfolioItemComponent implements OnInit {
    projects = require('../../assets/json/projects.json');
    projectColor: any;
  constructor() {
   }

  ngOnInit() {
  }

}
