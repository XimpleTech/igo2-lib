export interface SearchSourceOptions {
  url?: string;
  locateUrl?: string;
  limit?: number;
  enabled?: boolean;
  type?: string;
  distance?: number;
  appid?: string;
  appkey?: string;
}

export interface SearchSourcesOptions {
  icherche?: SearchSourceOptions;
  nominatim?: SearchSourceOptions;
  tgos?: SearchSourceOptions;
  datasource?: SearchSourceOptions;
}
