import { TestBed, inject } from '@angular/core/testing';

import { MaxPagesService } from './max-pages.service';

describe('MaxPagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaxPagesService]
    });
  });

  it('should ...', inject([MaxPagesService], (service: MaxPagesService) => {
    expect(service).toBeTruthy();
  }));
});
