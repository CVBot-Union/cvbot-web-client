import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerSelectComponent } from './tracker-select.component';

describe('TrackerSelectComponent', () => {
  let component: TrackerSelectComponent;
  let fixture: ComponentFixture<TrackerSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
