import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplyeeUpdateComponent } from './emplyee-update.component';

describe('EmplyeeUpdateComponent', () => {
  let component: EmplyeeUpdateComponent;
  let fixture: ComponentFixture<EmplyeeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmplyeeUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplyeeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
