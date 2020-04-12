import { TestBed } from '@angular/core/testing';

import { LibMsloginService } from './lib-mslogin.service';

describe('LibMsloginService', () => {
  let service: LibMsloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibMsloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
