import { TestBed } from '@angular/core/testing';

import { MstreeService } from './mstree.service';

describe('MstreeService', () => {
  let service: MstreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MstreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
