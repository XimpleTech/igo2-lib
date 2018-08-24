import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureDetailToolComponent } from './feature-detail-tool.component';

describe('FeatureDetailToolComponent', () => {
  let component: FeatureDetailToolComponent;
  let fixture: ComponentFixture<FeatureDetailToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureDetailToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureDetailToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
