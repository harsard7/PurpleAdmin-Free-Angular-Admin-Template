import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSubjectClassroomComponent } from './set-subject-classroom.component';

describe('SetSubjectClassroomComponent', () => {
  let component: SetSubjectClassroomComponent;
  let fixture: ComponentFixture<SetSubjectClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetSubjectClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSubjectClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
