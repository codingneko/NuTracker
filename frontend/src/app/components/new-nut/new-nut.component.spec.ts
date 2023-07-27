import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNutComponent } from './new-nut.component';

describe('NewNutComponent', () => {
  let component: NewNutComponent;
  let fixture: ComponentFixture<NewNutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewNutComponent]
    });
    fixture = TestBed.createComponent(NewNutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
