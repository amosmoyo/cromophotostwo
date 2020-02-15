import { TestBed } from '@angular/core/testing';

import { AuthetificationService } from './authetification.service';

describe('AuthetificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthetificationService = TestBed.get(AuthetificationService);
    expect(service).toBeTruthy();
  });
});
