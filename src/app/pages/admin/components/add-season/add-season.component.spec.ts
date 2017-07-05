import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeasonComponent } from './add-season.component';

describe('AddSeasonComponent', () => {
  let component: AddSeasonComponent;
  let fixture: ComponentFixture<AddSeasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSeasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
