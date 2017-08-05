import { TestBed, inject } from '@angular/core/testing';

import { UserLookupService } from './user-lookup.service';

describe('UserLookupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLookupService]
    });
  });

  it('should ...', inject([UserLookupService], (service: UserLookupService) => {
    expect(service).toBeTruthy();
  }));
});
