import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntrollmentComponent } from './create-entrollment.component';

describe('CreateEntrollmentComponent', () => {
  let component: CreateEntrollmentComponent;
  let fixture: ComponentFixture<CreateEntrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEntrollmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEntrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
