import { TestBed } from '@angular/core/testing';

import { SubjectdetailService } from './subjectdetail.service';

describe('SubjectdetailService', () => {
  let service: SubjectdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
