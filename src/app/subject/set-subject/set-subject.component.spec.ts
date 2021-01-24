import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSubjectComponent } from './set-subject.component';

describe('SetSubjectComponent', () => {
  let component: SetSubjectComponent;
  let fixture: ComponentFixture<SetSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
