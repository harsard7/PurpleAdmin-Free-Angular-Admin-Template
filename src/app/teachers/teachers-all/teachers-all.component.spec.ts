import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersAllComponent } from './teachers-all.component';

describe('TeachersAllComponent', () => {
  let component: TeachersAllComponent;
  let fixture: ComponentFixture<TeachersAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
