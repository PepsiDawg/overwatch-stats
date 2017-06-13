import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFormTogglesComponent } from './match-form-toggles.component';

describe('MatchFormTogglesComponent', () => {
  let component: MatchFormTogglesComponent;
  let fixture: ComponentFixture<MatchFormTogglesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchFormTogglesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchFormTogglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
