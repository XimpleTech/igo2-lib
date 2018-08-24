import { TestBed, inject } from '@angular/core/testing';

import { MapFactoryService } from './map-factory.service';

describe('MapFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapFactoryService]
    });
  });

  it('should be created', inject([MapFactoryService], (service: MapFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
