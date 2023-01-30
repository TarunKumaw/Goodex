import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrequotesComponent } from './prequotes.component';

describe('PrequotesComponent', () => {
  let component: PrequotesComponent;
  let fixture: ComponentFixture<PrequotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrequotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrequotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
