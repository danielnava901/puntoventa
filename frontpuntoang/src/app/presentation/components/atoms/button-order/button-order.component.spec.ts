import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonOrderComponent } from './button-order.component';

describe('ButtonOrderComponent', () => {
  let component: ButtonOrderComponent;
  let fixture: ComponentFixture<ButtonOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
