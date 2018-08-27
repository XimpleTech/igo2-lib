import {
  NgModule,
  ModuleWithProviders,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { IgoFeatureModule } from '@ximple/igo2-geo';
import { FeatureDetailToolComponent } from './feature-detail-tool.component';

@NgModule({
  imports: [IgoFeatureModule],
  declarations: [FeatureDetailToolComponent],
  exports: [FeatureDetailToolComponent],
  entryComponents: [FeatureDetailToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IgoFeatureDetailToolModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IgoFeatureDetailToolModule,
      providers: []
    };
  }
}
