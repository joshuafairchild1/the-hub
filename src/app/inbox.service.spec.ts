import { TestBed, inject } from '@angular/core/testing';

import { InboxService } from './inbox.service';

describe('InboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InboxService]
    });
  });

  it('should ...', inject([InboxService], (service: InboxService) => {
    expect(service).toBeTruthy();
  }));
});
