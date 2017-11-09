import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpGenderComponent } from './exp-gender.component';

describe('ExpGenderComponent', () => {
  let component: ExpGenderComponent;
  let fixture: ComponentFixture<ExpGenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpGenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
