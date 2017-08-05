import { TestBed, inject } from '@angular/core/testing';

import { RepoLookupService } from './repo-lookup.service';

describe('RepoLookupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepoLookupService]
    });
  });

  it('should ...', inject([RepoLookupService], (service: RepoLookupService) => {
    expect(service).toBeTruthy();
  }));
});
