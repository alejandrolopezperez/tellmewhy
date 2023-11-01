import { TestBed } from '@angular/core/testing';

import { GoogleTagService } from './google-tag.service';

describe('GoogleTagService', () => {
  let service: GoogleTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
