import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplyeeCreateComponent } from './emplyee-create.component';

describe('EmplyeeCreateComponent', () => {
  let component: EmplyeeCreateComponent;
  let fixture: ComponentFixture<EmplyeeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmplyeeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplyeeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
