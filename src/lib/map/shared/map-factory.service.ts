import { Injectable } from '@angular/core';
import {ConfigService} from '../../core/config';
import {MapOptions} from './map.interface';
import {IgoMap} from './map';

@Injectable()
export class MapFactoryService {

  constructor(private config: ConfigService) { }

  public createIgoMap(options?: MapOptions) {
    return new IgoMap(options, this.config);
  }

}
