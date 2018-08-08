import { Component, OnInit } from '@angular/core';
import {Register} from '../../shared';


@Register({
  name: 'featureDetails',
  title: 'igo.featureDetails',
  icon: 'bookmark'
})
@Component({
  selector: 'igo-feature-detail-tool',
  templateUrl: './feature-detail-tool.component.html',
  styleUrls: ['./feature-detail-tool.component.styl']
})
export class FeatureDetailToolComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
