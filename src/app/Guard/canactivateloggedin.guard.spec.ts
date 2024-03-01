import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canactivateloggedinGuard } from './canactivateloggedin.guard';

describe('canactivateloggedinGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canactivateloggedinGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
