import olAttribution from 'ol/control/Attribution';

import { DataSourceOptions } from './datasource.interface';
import { FeatureDataSourceOptions } from './feature-datasource.interface';

export interface ArcGISRestDataSourceOptions
  extends DataSourceOptions,
    FeatureDataSourceOptions {
  // type?: 'arcgisrest'
  layer: string;
  params?: ArcGISRestDataSourceOptionsParams;
}

export interface ArcGISRestDataSourceOptionsParams {
  customParams?: string[]; // any ArcGIS Rest query parameters for feature service layer resource
  legendInfo?: any;
  style?: any;
  timefilter?: any;
  timeExtent?: string;
  attributions?: olAttribution;
}
