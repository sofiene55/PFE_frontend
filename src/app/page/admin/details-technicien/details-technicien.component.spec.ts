import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTechnicienComponent } from './details-technicien.component';

describe('DetailsTechnicienComponent', () => {
  let component: DetailsTechnicienComponent;
  let fixture: ComponentFixture<DetailsTechnicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTechnicienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
