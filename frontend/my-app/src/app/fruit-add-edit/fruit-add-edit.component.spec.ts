import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitAddEditComponent } from './fruit-add-edit.component';

describe('EmpAddEditComponent', () => {
  let component: FruitAddEditComponent;
  let fixture: ComponentFixture<FruitAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FruitAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FruitAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
