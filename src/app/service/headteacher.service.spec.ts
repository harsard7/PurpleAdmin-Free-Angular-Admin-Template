import { TestBed } from '@angular/core/testing';

import { HeadteacherService } from './headteacher.service';

describe('HeadteacherService', () => {
  let service: HeadteacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadteacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
