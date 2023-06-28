import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgCodeViewerComponent } from './svg-code-viewer.component';

describe('SvgCodeViewerComponent', () => {
  let component: SvgCodeViewerComponent;
  let fixture: ComponentFixture<SvgCodeViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SvgCodeViewerComponent]
    });
    fixture = TestBed.createComponent(SvgCodeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
