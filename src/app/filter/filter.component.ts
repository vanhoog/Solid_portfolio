import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Artist } from '../artist.model';
import { FavoriteService } from '../favorite.service';
declare var require: any
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    artistsFiltered: any;
    artists: any;
    setTimes: any;

    favorites: any;
    day: any;
    savedFavorites: any;
    timetableFriday = [];
    timetableSaturday = [];
    timetableSunday = [];
    timetable = require('../../assets/json/artists.json');
    constructor(private favoriteService: FavoriteService) {
        this.timetables();
    }
    ngOnInit() {
        this.filter(null)
    }

    private filter(day) {
        this.day = day;
        this.artists = this.favoriteService.getArtists(day);
   }

   favorite(artist: Artist) {
       const saveArtist = {... artist};
       this.favoriteService.favSave(saveArtist);
       this.artists = this.favoriteService.getArtists(this.day);
   }

   timetables() {
      this.timetable.filter( (item) => {
           if(item.day === "Friday") {
               this.timetableFriday.push(item);
               return this.timetableFriday.sort((a, b) => a.timeslot.localeCompare(b.timeslot));
           } else if (item.day === "Saturday") {
               this.timetableSaturday.push(item);
               return this.timetableSaturday.sort((a, b) => a.timeslot.localeCompare(b.timeslot));
           } else if (item.day === "Sunday") {
               this.timetableSunday.push(item);
               return this.timetableSunday.sort((a, b) => a.timeslot.localeCompare(b.timeslot));
           }
       });
   }
}
