import { TestBed } from '@angular/core/testing';

import { TablesResolver } from './tables.resolver';

describe('TablesResolver', () => {
  let resolver: TablesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TablesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
