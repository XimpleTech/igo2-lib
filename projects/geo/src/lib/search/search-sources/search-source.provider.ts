import { HttpClient } from '@angular/common/http';

import { ConfigService, LanguageService } from '@ximple/igo2-core';

import { SearchSource } from './search-source';
import { NominatimSearchSource } from './nominatim-search-source';
import { IChercheSearchSource } from './icherche-search-source';
import { DataSourceSearchSource } from './datasource-search-source';
import { TgosSearchSource } from './tgos-search-source';

export function nominatimSearchSourcesFactory(
  http: HttpClient,
  config: ConfigService
) {
  return new NominatimSearchSource(http, config);
}

export function provideNominatimSearchSource() {
  return {
    provide: SearchSource,
    useFactory: nominatimSearchSourcesFactory,
    multi: true,
    deps: [ HttpClient, ConfigService ]
  };
}

export function ichercheSearchSourcesFactory(
  http: HttpClient,
  config: ConfigService
) {
  return new IChercheSearchSource(http, config);
}

export function provideIChercheSearchSource() {
  return {
    provide: SearchSource,
    useFactory: ichercheSearchSourcesFactory,
    multi: true,
    deps: [ HttpClient, ConfigService ]
  };
}

export function dataSourceSearchSourcesFactory(
  http: HttpClient,
  config: ConfigService,
  languageService: LanguageService
) {
  return new DataSourceSearchSource(http, config, languageService);
}

export function provideDataSourceSearchSource() {
  return {
    provide: SearchSource,
    useFactory: dataSourceSearchSourcesFactory,
    multi: true,
    deps: [ HttpClient, ConfigService, LanguageService ]
  };
}

export function tgosSearchSourcesFactory(
  http: HttpClient,
  config: ConfigService
) {
  return new TgosSearchSource(http, config);
}

export function provideTgosSearchSource() {
  return {
    provide: SearchSource,
    useFactory: tgosSearchSourcesFactory,
    multi: true,
    deps: [ HttpClient, ConfigService ]
  };
}
