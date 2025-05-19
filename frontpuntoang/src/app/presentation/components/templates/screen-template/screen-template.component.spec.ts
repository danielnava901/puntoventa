import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenTemplateComponent } from './screen-template.component';

describe('ScreenTemplateComponent', () => {
  let component: ScreenTemplateComponent;
  let fixture: ComponentFixture<ScreenTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
