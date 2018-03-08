import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtournamentComponent } from './addtournament.component';

describe('AddtournamentComponent', () => {
  let component: AddtournamentComponent;
  let fixture: ComponentFixture<AddtournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
