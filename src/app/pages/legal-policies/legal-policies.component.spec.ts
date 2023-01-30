import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalPoliciesComponent } from './legal-policies.component';

describe('LegalPoliciesComponent', () => {
  let component: LegalPoliciesComponent;
  let fixture: ComponentFixture<LegalPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
