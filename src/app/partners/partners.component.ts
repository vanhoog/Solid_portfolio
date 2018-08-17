import { Component, OnInit } from '@angular/core';
declare var require: any
@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
    data_partners = require('../../assets/json/partners.json');
    partners = [];

  constructor() {
      this.partners = this.data_partners;
  }

  ngOnInit() {
  }

}
