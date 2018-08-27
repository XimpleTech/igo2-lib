import { NgModule, ModuleWithProviders } from '@angular/core';

import { IgoContextManagerModule } from './context-manager/context-manager.module';
import { IgoContextMapButtonModule } from './context-map-button/context-map-button.module';
import { IgoShareMapModule } from './sharemap/share-map.module';
import { IgoSidenavModule } from './sidenav/sidenav.module';
import { IgoToolModule } from './tool/tool.module';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    IgoContextManagerModule,
    IgoContextMapButtonModule,
    IgoShareMapModule,
    IgoSidenavModule,
    IgoToolModule
  ]
})
export class IgoContextModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IgoContextModule,
      providers: []
    };
  }
}
