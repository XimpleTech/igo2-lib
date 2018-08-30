import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatListModule,
  MatTooltipModule
} from '@angular/material';

import { IgoLanguageModule } from '@ximple/igo2-core';
import { IgoListModule } from '@ximple/igo2-common';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarBindingDirective } from './toolbar/toolbar-binding.directive';
import { ToolbarItemComponent } from './toolbar-item/toolbar-item.component';
import { ToolboxComponent } from './toolbox/toolbox.component';

@NgModule({
  imports: [
    CommonModule,
    IgoLanguageModule,
    IgoListModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule
  ],
  exports: [
    ToolbarComponent,
    ToolbarBindingDirective,
    ToolbarItemComponent,
    ToolboxComponent
  ],
  declarations: [
    ToolbarComponent,
    ToolbarBindingDirective,
    ToolbarItemComponent,
    ToolboxComponent
  ]
})
export class IgoToolModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IgoToolModule
    };
  }
}
