import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { WMSCapabilities, WMTSCapabilities } from 'ol/format';
import { optionsFromCapabilities } from 'ol/source/WMTS.js';
import olAttribution from 'ol/control/Attribution';

import { ObjectUtils } from '@igo2/utils';
import { EsriStyleGenerator } from '../utils/esri-style-generator';

import {
  WMTSDataSourceOptions,
  WMSDataSourceOptions,
  CartoDataSourceOptions,
  ArcGISRestDataSourceOptions,
  TileArcGISRestDataSourceOptions
} from './datasources';

@Injectable({
  providedIn: 'root'
})
export class CapabilitiesService {
  private capabilitiesStore: any[] = [];
  private parsers = {
    wms: new WMSCapabilities(),
    wmts: new WMTSCapabilities()
  };

  constructor(private http: HttpClient) {}

  getWMSOptions(
    baseOptions: WMSDataSourceOptions
  ): Observable<WMSDataSourceOptions> {
    const url = baseOptions.url;
    const version = (baseOptions.params as any).version;

    return this.getCapabilities('wms', url, version).pipe(
      map((capabilities: any) =>
        this.parseWMSOptions(baseOptions, capabilities)
      )
    );
  }

  getWMTSOptions(
    baseOptions: WMTSDataSourceOptions
  ): Observable<WMTSDataSourceOptions> {
    const url = baseOptions.url;
    const version = baseOptions.version;

    const options = this.getCapabilities('wmts', url, version).pipe(
      map((capabilities: any) =>
        this.parseWMTSOptions(baseOptions, capabilities)
      )
    );

    return options;
  }

  getCartoOptions(
    baseOptions: CartoDataSourceOptions
  ): Observable<CartoDataSourceOptions> {
    const baseUrl =
      'https://' +
      baseOptions.account +
      '.carto.com/api/v2/viz/' +
      baseOptions.mapId +
      '/viz.json';

    return this.http
      .jsonp(baseUrl, 'callback')
      .pipe(
        map((cartoOptions: any) =>
          this.parseCartoOptions(baseOptions, cartoOptions)
        )
      );
  }

  getArcgisOptions(
    baseOptions: ArcGISRestDataSourceOptions
  ): Observable<ArcGISRestDataSourceOptions> {
    const baseUrl = baseOptions.url + '/' + baseOptions.layer + '?f=json';
    const modifiedUrl = baseOptions.url.replace('FeatureServer', 'MapServer');
    const legendUrl = modifiedUrl + '/legend?f=json';
    const arcgisOptions = this.http.get(baseUrl);
    const legend = this.http.get(legendUrl).pipe(
      map((res: any) => res),
      catchError(err => {
        console.log('No legend associated with this Feature Service');
        return of(err);
      })
    );
    return forkJoin([arcgisOptions, legend]).pipe(
      map((res: any) => {
        return this.parseArcgisOptions(baseOptions, res[0], res[1]);
      })
    );
  }

  getTileArcgisOptions(
    baseOptions: TileArcGISRestDataSourceOptions
  ): Observable<TileArcGISRestDataSourceOptions> {
    const baseUrl = baseOptions.url + '/' + baseOptions.layer + '?f=json';
    const legendUrl = baseOptions.url + '/legend?f=json';
    const arcgisOptions = this.http.get(baseUrl);
    const legendInfo = this.http.get(legendUrl);

    return forkJoin([arcgisOptions, legendInfo]).pipe(
      map((res: any) =>
        this.parseTileArcgisOptions(baseOptions, res[0], res[1])
      )
    );
  }

  getCapabilities(
    service: 'wms' | 'wmts',
    baseUrl: string,
    version?: string
  ): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        request: 'GetCapabilities',
        service: service,
        version: version || '1.3.0'
      }
    });

    const url = baseUrl + '?' + params.toString();
    const cached = this.capabilitiesStore.find(value => value.url === url);
    if (cached !== undefined) {
      return new Observable(c => c.next(cached.capabilities));
    }

    const request = this.http.get(baseUrl, {
      params: params,
      responseType: 'text'
    });

    return request.pipe(
      map(res => {
        const capabilities = this.parsers[service].read(res);
        this.cache(url, capabilities);
        return capabilities;
      })
    );
  }

  private parseWMSOptions(
    baseOptions: WMSDataSourceOptions,
    capabilities: any
  ): WMSDataSourceOptions {
    const layers = (baseOptions.params as any).layers;
    const layer = this.findDataSourceInCapabilities(
      capabilities.Capability.Layer,
      layers
    );

    if (!layer) {
      return baseOptions;
    }
    const metadata = layer.DataURL ? layer.DataURL[0] : undefined;
    const abstract = layer.Abstract ? layer.Abstract : undefined;
    const keywordList = layer.KeywordList ? layer.KeywordList : undefined;
    const timeFilter = this.getTimeFilter(layer);
    const timeFilterable =
      timeFilter && Object.keys(timeFilter).length > 0 ? true : false;

    const options: WMSDataSourceOptions = ObjectUtils.removeUndefined({
      _layerOptionsFromCapabilities: {
        title: layer.Title,
        maxResolution:
          this.getResolutionFromScale(layer.MaxScaleDenominator) || Infinity,
        minResolution:
          this.getResolutionFromScale(layer.MinScaleDenominator) || 0,
        metadata: {
          url: metadata ? metadata.OnlineResource : undefined,
          extern: metadata ? true : undefined,
          abstract: abstract,
          keywordList: keywordList
        }
      },
      timeFilter: timeFilterable ? timeFilter : undefined,
      timeFilterable: timeFilterable ? true : undefined
    });

    return ObjectUtils.mergeDeep(options, baseOptions);
  }

  private parseWMTSOptions(
    baseOptions: WMTSDataSourceOptions,
    capabilities: any
  ): WMTSDataSourceOptions {
    const options = optionsFromCapabilities(capabilities, baseOptions);

    return Object.assign(options, baseOptions);
  }

  private parseCartoOptions(
    baseOptions: CartoDataSourceOptions,
    cartoOptions: any
  ): CartoDataSourceOptions {
    const layers = [];
    const params = cartoOptions.layers[1].options.layer_definition;
    params.layers.forEach(element => {
      layers.push({
        type: element.type.toLowerCase(),
        options: element.options,
        legend: element.legend
      });
    });
    const options = ObjectUtils.removeUndefined({
      config: {
        version: params.version,
        layers: layers
      }
    });
    return ObjectUtils.mergeDeep(options, baseOptions);
  }

  private parseArcgisOptions(
    baseOptions: ArcGISRestDataSourceOptions,
    arcgisOptions: any,
    legend?: any
  ): ArcGISRestDataSourceOptions {
    const legendInfo = legend.layers ? legend : undefined;
    const styleGenerator = new EsriStyleGenerator();
    const units = arcgisOptions.units === 'esriMeters' ? 'm' : 'degrees';
    const style = styleGenerator.generateStyle(arcgisOptions, units);
    const attributions = new olAttribution({
      html: arcgisOptions.copyrightText
    });
    let timeExtent, timeFilter;
    if (arcgisOptions.timeInfo) {
      const time = arcgisOptions.timeInfo.timeExtent;
      timeExtent = time[0] + ',' + time[1];
      const min = new Date();
      min.setTime(time[0]);
      const max = new Date();
      max.setTime(time[1]);
      timeFilter = {
        min: min.toUTCString(),
        max: max.toUTCString(),
        range: true,
        type: 'datetime',
        style: 'calendar'
      };
    }
    const params = Object.assign(
      {},
      {
        legendInfo: legendInfo,
        style: style,
        timeFilter: timeFilter,
        timeExtent: timeExtent,
        attributions: attributions
      }
    );
    const options = ObjectUtils.removeUndefined({
      params: params
    });
    return ObjectUtils.mergeDeep(options, baseOptions);
  }

  private parseTileArcgisOptions(
    baseOptions: TileArcGISRestDataSourceOptions,
    arcgisOptions: any,
    legend: any
  ): TileArcGISRestDataSourceOptions {
    const legendInfo = legend.layers ? legend : undefined;
    const attributions = new olAttribution({
      html: arcgisOptions.copyrightText
    });
    let timeExtent, timeFilter;
    if (arcgisOptions.timeInfo) {
      const time = arcgisOptions.timeInfo.timeExtent;
      timeExtent = time[0] + ',' + time[1];
      const min = new Date();
      min.setTime(time[0]);
      const max = new Date();
      max.setTime(time[1]);
      timeFilter = {
        min: min.toUTCString(),
        max: max.toUTCString(),
        range: true,
        type: 'datetime',
        style: 'calendar'
      };
    }
    const params = Object.assign(
      {},
      {
        layers: 'show:' + baseOptions.layer,
        time: timeExtent
      }
    );
    const options = ObjectUtils.removeUndefined({
      params: params,
      legendInfo: legendInfo,
      timeFilter: timeFilter,
      attributions: attributions
    });
    return ObjectUtils.mergeDeep(options, baseOptions);
  }

  private findDataSourceInCapabilities(layerArray, name): any {
    if (Array.isArray(layerArray)) {
      let layer;
      layerArray.find(value => {
        layer = this.findDataSourceInCapabilities(value, name);
        return layer !== undefined;
      }, this);

      return layer;
    } else if (layerArray.Layer) {
      return this.findDataSourceInCapabilities(layerArray.Layer, name);
    } else {
      if (layerArray.Name && layerArray.Name === name) {
        return layerArray;
      }
      return undefined;
    }
  }

  private cache(url: string, capabilities: any) {
    this.capabilitiesStore.push({
      url: url,
      capabilities: capabilities
    });
  }

  private getResolutionFromScale(scale: number): number {
    const dpi = 25.4 / 0.28;
    return scale / (39.37 * dpi);
  }

  getTimeFilter(layer) {
    let dimension;

    if (layer.Dimension) {
      const timeFilter: any = {};
      dimension = layer.Dimension[0];

      if (dimension.values) {
        const minMaxDim = dimension.values.split('/');
        timeFilter.min = minMaxDim[0] !== undefined ? minMaxDim[0] : undefined;
        timeFilter.max = minMaxDim[1] !== undefined ? minMaxDim[1] : undefined;
        timeFilter.step = minMaxDim[2] !== undefined ? minMaxDim[2] : undefined;
      }

      if (dimension.default) {
        timeFilter.value = dimension.default;
      }
      return timeFilter;
    }
  }
}
