import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtgroupManageComponent } from './rtgroup-manage.component';

describe('RtgroupManageComponent', () => {
  let component: RtgroupManageComponent;
  let fixture: ComponentFixture<RtgroupManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtgroupManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtgroupManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
