import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddleagueComponent } from './addleague.component';

describe('AddleagueComponent', () => {
  let component: AddleagueComponent;
  let fixture: ComponentFixture<AddleagueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddleagueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddleagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
