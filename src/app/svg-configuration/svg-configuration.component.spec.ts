import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgConfigurationComponent } from './svg-configuration.component';

describe('SvgConfigurationComponent', () => {
  let component: SvgConfigurationComponent;
  let fixture: ComponentFixture<SvgConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SvgConfigurationComponent]
    });
    fixture = TestBed.createComponent(SvgConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
