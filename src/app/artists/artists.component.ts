import { Component, OnInit, Input } from '@angular/core';
import { makeDecorator } from '@angular/core/src/util/decorators';
import { Artist } from '../artist.model';
@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
@Input() artist: Artist;
  constructor() { }

  ngOnInit() {
  }

}
