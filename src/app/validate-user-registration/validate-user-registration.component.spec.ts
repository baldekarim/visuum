import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateUserRegistrationComponent } from './validate-user-registration.component';

describe('ValidateUserRegistrationComponent', () => {
  let component: ValidateUserRegistrationComponent;
  let fixture: ComponentFixture<ValidateUserRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateUserRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateUserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
