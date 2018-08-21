import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { PortfolioItemComponent } from './portfolio-item/portfolio-item.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PortfolioItemComponent,    
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
