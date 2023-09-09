import { TestBed } from '@angular/core/testing';

import { NutService } from './nut.service';

describe('NutService', () => {
  let service: NutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
