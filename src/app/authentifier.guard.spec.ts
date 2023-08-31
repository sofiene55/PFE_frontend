import { TestBed } from '@angular/core/testing';

import { AuthentifierGuard } from './authentifier.guard';

describe('AuthentifierGuard', () => {
  let guard: AuthentifierGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthentifierGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
