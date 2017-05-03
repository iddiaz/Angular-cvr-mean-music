import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSetingComponent } from './user-seting.component';

describe('UserSetingComponent', () => {
  let component: UserSetingComponent;
  let fixture: ComponentFixture<UserSetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
