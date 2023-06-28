import { TestBed } from '@angular/core/testing';

import { GenerateSvgService } from './generate-svg.service';

describe('GenerateSvgService', () => {
  let service: GenerateSvgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateSvgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
