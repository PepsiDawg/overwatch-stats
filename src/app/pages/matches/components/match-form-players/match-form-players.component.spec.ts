import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFormPlayersComponent } from './match-form-players.component';

describe('MatchFormPlayersComponent', () => {
  let component: MatchFormPlayersComponent;
  let fixture: ComponentFixture<MatchFormPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchFormPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchFormPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
