import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Artist } from '../artist.model';
declare var require: any
@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})

export class ArtistListComponent implements OnInit {
    target: any;
    @Input() artist: Artist;
    isFavorite: boolean;
    @Output() onFavoriteChanged: EventEmitter<Artist> = new EventEmitter();

  ngOnInit() {
      this.isFavorite = this.artist.favorite;
  }
  open($event) {
      let target = $event.target.closest('li');
      if (document.getElementsByClassName('o-column o-column--12 o-column--M-6 o-column--L-4 js-item active').length) {
         document.getElementsByClassName('o-column o-column--12 o-column--M-6 o-column--L-4 js-item active')[0].classList.remove("active");
     }
     target.classList.add("active");
  }
  close($event) {
      $event.target.closest('li').classList.remove("active");
  }

  favorite($event) {
      this.onFavoriteChanged.emit(this.artist);
  }


}
