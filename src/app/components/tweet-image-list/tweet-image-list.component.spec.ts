import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetImageListComponent } from './tweet-image-list.component';

describe('TweetImageListComponent', () => {
  let component: TweetImageListComponent;
  let fixture: ComponentFixture<TweetImageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetImageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
