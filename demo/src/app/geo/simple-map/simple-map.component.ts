import { Component, OnDestroy, OnInit } from '@angular/core';

import { LanguageService } from '@ximple/igo2-core';
import { IgoMap, DataSourceService, LayerService } from '@ximple/igo2-geo';

import * as olproj from 'ol/proj';

@Component({
  selector: 'app-simple-map',
  templateUrl: './simple-map.component.html',
  styleUrls: ['./simple-map.component.scss']
})
export class AppSimpleMapComponent implements OnInit, OnDestroy {
  public map = new IgoMap({
    controls: {
      attribution: {
        collapsed: true
      }
    }
  });

  public view = {
    center: [-73, 47.2],
    zoom: 6
  };

  constructor(
    private languageService: LanguageService,
    private dataSourceService: DataSourceService,
    private layerService: LayerService
  ) {
    this.dataSourceService
      .createAsyncDataSource({
        type: 'osm'
      })
      .subscribe(dataSource => {
        this.map.addLayer(
          this.layerService.createLayer({
            title: 'OSM',
            source: dataSource
          })
        );
      });
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.map.ol.on('click', (evt) => {
      const e1: any = evt;
      const lonlat = olproj.toLonLat(e1.coordinate);
      console.log('click:' + e1.coordinate + ' lonlat:' + lonlat);
    });

  }
}
