import { TestBed } from '@angular/core/testing';

import { EntrollmentService } from './entrollment.service';

describe('EntrollmentService', () => {
  let service: EntrollmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrollmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
