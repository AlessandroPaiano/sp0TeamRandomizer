import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRandomizerComponent } from './team-randomizer.component';

describe('TeamRandomizerComponent', () => {
  let component: TeamRandomizerComponent;
  let fixture: ComponentFixture<TeamRandomizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamRandomizerComponent]
    });
    fixture = TestBed.createComponent(TeamRandomizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
