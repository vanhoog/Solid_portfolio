import { Injectable, Input } from '@angular/core';
import { Artist } from './artist.model';
declare var require: any;

export class FavoriteService {
  private artists: Array<Artist>;

  constructor() {
      this.artists = require('../assets/json/artists.json');
  }

   getArtists(day?: string): Array<Artist> {
     let result = this.artists;
     if (localStorage.favorites) {
         let favorites =  JSON.parse(localStorage.favorites);
         result = this.artists.map((item) => {
             item.favorite = false;
             for(let i = 0; i < favorites.length; i++) {
                 if( item.name == favorites[i].name) {
                     item.favorite = true;
                 }
             }
             return item;
         });
     }
      if(day && day != "all") {
          if (day != "Favorites") {
              result = this.artists.filter( (item) => {
                  return item.day == day;
              });
          } else {
              result = this.artists.filter( (item) => {
                  return item.favorite;
              });
          }
      } else {
          result = this.artists;
      }

      return result.sort((a, b) => a.name.localeCompare(b.name));
  }

 favSave(artist: Artist) {
     let favorites =  localStorage.favorites ? JSON.parse(localStorage.getItem('favorites')) : [];
     let index = favorites.findIndex(item => { return item.name == artist.name; });
     if (index > -1) {
         favorites.splice(index, 1);
     } else{
         favorites.push(artist);
     }

     localStorage.setItem('favorites', JSON.stringify(favorites));
   }
}
