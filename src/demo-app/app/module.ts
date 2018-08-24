import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule, MatCardModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { IgoModule,
         provideIChercheSearchSource,
         //provideNominatimSearchSource,
         provideDataSourceSearchSource,
          provideTgosSearchSource,
         RouteService,
         provideConfigOptions } from '../../lib';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

import {TranslateService} from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    TranslateModule.forRoot(),
    /*
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }), */

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
export class AppModule {
  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('zh_TW');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('zh_TW');
  }
}
