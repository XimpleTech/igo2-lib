import { NgModule } from '@angular/core';
import { MatCardModule, MatButtonModule } from '@angular/material';

import { IgoPanelModule } from '@ximple/igo2-common';
import { IgoMapModule } from '@ximple/igo2-geo';
import { IgoContextManagerModule } from '@ximple/igo2-context';

import { AppContextComponent } from './context.component';
import { AppContextRoutingModule } from './context-routing.module';

@NgModule({
  declarations: [AppContextComponent],
  imports: [
    AppContextRoutingModule,
    MatCardModule,
    MatButtonModule,
    IgoPanelModule,
    IgoMapModule,
    IgoContextManagerModule
  ],
  exports: [AppContextComponent]
})
export class AppContextModule {}
