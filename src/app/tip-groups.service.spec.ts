import { TestBed } from '@angular/core/testing';

import { TipGroupsService } from './tip-groups.service';

describe('TipGroupService', () => {
  let service: TipGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
