import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewCategoryComponent } from './user-view-category.component';

describe('UserViewCategoryComponent', () => {
  let component: UserViewCategoryComponent;
  let fixture: ComponentFixture<UserViewCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
