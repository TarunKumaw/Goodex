import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomePosComponent } from './become-pos.component';

describe('BecomePosComponent', () => {
  let component: BecomePosComponent;
  let fixture: ComponentFixture<BecomePosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomePosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomePosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
