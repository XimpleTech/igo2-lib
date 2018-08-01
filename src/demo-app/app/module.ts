import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule, MatCardModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { IgoModule,
         provideIChercheSearchSource,
         //provideNominatimSearchSource,
         provideDataSourceSearchSource,
          provideTgosSearchSource,
         RouteService,
         provideConfigOptions } from '../../lib';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),

    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    IgoModule.forRoot()
  ],
  providers: [
    provideConfigOptions({
      default: environment.igo,
      path: './config/config.json'
    }),
    RouteService,
    //provideNominatimSearchSource(),
    provideIChercheSearchSource(),
    provideDataSourceSearchSource(),
    provideTgosSearchSource()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
