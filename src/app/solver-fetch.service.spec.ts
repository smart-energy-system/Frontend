import { TestBed } from '@angular/core/testing';

import { SolverFetchService } from './solver-fetch.service';

describe('SolverFetchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolverFetchService = TestBed.get(SolverFetchService);
    expect(service).toBeTruthy();
  });
});
