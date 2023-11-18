import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FromFormModule } from 'from-form';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FromFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
