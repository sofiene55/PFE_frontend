import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectSolutionComponent } from './reject-solution.component';

describe('RejectSolutionComponent', () => {
  let component: RejectSolutionComponent;
  let fixture: ComponentFixture<RejectSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectSolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
