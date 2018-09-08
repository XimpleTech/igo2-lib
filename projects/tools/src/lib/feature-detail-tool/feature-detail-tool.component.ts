import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Register } from '@ximple/igo2-context';
import { FeatureService } from '@ximple/igo2-geo';


@Register({
  name: 'featureDetails',
  title: 'igo.tools.featureDetails',
  icon: 'bookmark'
})
@Component({
  selector: 'igo-feature-detail-tool',
  templateUrl: './feature-detail-tool.component.html'
})
export class FeatureDetailToolComponent {
  constructor(public featureService: FeatureService) {
  }
}
