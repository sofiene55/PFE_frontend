import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenerCircularComponent } from './listener-circular.component';

describe('ListenerCircularComponent', () => {
  let component: ListenerCircularComponent;
  let fixture: ComponentFixture<ListenerCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListenerCircularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListenerCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
