import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDescriptorsComponent } from './match-descriptors.component';

describe('MatchDescriptorsComponent', () => {
  let component: MatchDescriptorsComponent;
  let fixture: ComponentFixture<MatchDescriptorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDescriptorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDescriptorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
