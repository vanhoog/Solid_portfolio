import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FavoriteService } from './favorite.service';
import { AppComponent } from './app.component';
import { ArtistsComponent } from './artists/artists.component';
import { FilterComponent } from './filter/filter.component';
import { FooterComponent } from './footer/footer.component';
import { PartnersComponent } from './partners/partners.component';
import { NavComponent } from './nav/nav.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ShopComponent } from './shop/shop.component';


@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    FilterComponent,
    FooterComponent,
    PartnersComponent,
    NavComponent,
    ArtistListComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [FavoriteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
