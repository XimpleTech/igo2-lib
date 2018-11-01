import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '@ximple/igo2-core';

import {
  Feature,
  FeatureType,
  FeatureFormat,
  SourceFeatureType
} from '../../feature';

import { SearchSource } from './search-source';
import { SearchSourceOptions } from './search-source.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class TgosSearchSource extends SearchSource {
  get enabled(): boolean {
    return this.options.enabled !== false;
  }

  set enabled(value: boolean) {
    this.options.enabled = value;
  }

  static _name = '地址定位 (全國門牌地址定位服務-TGOS)';
  static sortIndex = 10;

  private searchUrl = 'https://addr.tgos.nat.gov.tw/addrws/v30/QueryAddr.asmx/QueryAddr?';
  private appId = '';
  private appKey = '';
  private options: SearchSourceOptions;
  data: any;


  constructor(private http: HttpClient, private config: ConfigService) {
    super();

    this.options = this.config.getConfig('searchSources.tgos') || {};
    this.searchUrl = this.options.searchUrl || this.searchUrl;
    this.appId = this.options.appid || this.appId;
    this.appKey = this.options.appkey || this.appKey;
  }

  getName(): string {
    return TgosSearchSource._name;
  }

  search(term?: string): Observable<Feature[]> {
    const searchParams = this.getSearchParams(term);
    const url = this.searchUrl + '?_dt=null&oAPPId=' + encodeURIComponent(this.appId) +
      '&oAPIKey=' + encodeURIComponent(this.appKey);

    return this.http
      .get(url, {params: searchParams, responseType: 'text'})
      .pipe(map(res => res.substring(res.indexOf('{'), res.lastIndexOf('}') + 1)))
      .pipe(map(text => JSON.parse(text)))
      .pipe(map(resJson => resJson.AddressList))
      .pipe(map(res => this.extractData2(res, SourceFeatureType.Search)));
  }

  locate(
    coordinate: [ number, number ],
    zoom: number
  ): Observable<Feature[]> {
    return null;
  }

  private extractData2(response, resultType): Feature[] {
    if (response[ 0 ] && response[ 0 ].error) {
      return [];
    }
    return response.map(this.formatResultForTGos, resultType);
  }

  private getSearchParams(term: string): HttpParams {
    const limit = this.options.limit === undefined ? 10 : this.options.limit;

    return new HttpParams({
      fromObject: {
        oAddress: term,
        oSRS: 'EPSG:4326',
        oFuzzyType: '2',
        oResultDataType: 'json',
        oFuzzyBuffer: '0',
        oIsOnlyFullMatch: 'false',
        oIsLockCounty: 'false',
        oIsLockTown: 'false',
        oIsLockVillage: 'false',
        oIsLockRoadSection: 'false',
        oIsLockLane: 'false',
        oIsLockAlley: 'false',
        oIsLockArea: 'false',
        oIsSameNumber_SubNumber: 'false',
        oCanIgnoreVillage: 'false',
        oCanIgnoreNeighborhood: 'false',
        oReturnMaxCount: String(limit)
      }
    });
  }

  private formatResultForTGos(result: any, resultType): Feature {
    return {
      id: '179125824',
      source: TgosSearchSource._name,
      sourceType: resultType,
      order: 0,
      type: FeatureType.Feature,
      format: FeatureFormat.GeoJSON,
      title: result.FULL_ADDR,
      icon: 'place',
      projection: 'EPSG:4326',
      properties: {
        name: result.FULL_ADDR,
        place_id: '179125824',
        osm_type: 'relation',
        class: 'boundary',
        type: 'administrative'
      },
      geometry: {
        type: 'Point',
        coordinates: [ result.X, result.Y ]
      },
      extent: [
        result.X,
        result.Y,
        result.X + 0.00001141,
        result.Y + 0.00000899,
      ]
    };
  }
}
