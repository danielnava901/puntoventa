import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkNavComponent } from './link-nav.component';

describe('LinkNavComponent', () => {
  let component: LinkNavComponent;
  let fixture: ComponentFixture<LinkNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
