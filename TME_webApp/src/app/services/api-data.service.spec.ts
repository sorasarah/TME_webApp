import { TestBed } from '@angular/core/testing';

import { ApiService } from './api-data.service';

describe('ApiDataService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
