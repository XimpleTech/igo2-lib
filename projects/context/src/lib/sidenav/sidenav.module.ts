import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatTooltipModule
} from '@angular/material';

import { IgoLanguageModule } from '@ximple/igo2-core';
import { IgoPanelModule, IgoFlexibleModule } from '@ximple/igo2-common';
import { IgoFeatureModule } from '@ximple/igo2-geo';

import { IgoContextManagerModule } from '../context-manager/context-manager.module';
import { IgoToolModule } from '../tool/tool.module';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule,
    IgoLanguageModule,
    IgoPanelModule,
    IgoFlexibleModule,
    IgoFeatureModule,
    IgoContextManagerModule,
    IgoToolModule
  ],
  exports: [SidenavComponent],
  declarations: [SidenavComponent]
})
export class IgoSidenavModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IgoSidenavModule
    };
  }
}
