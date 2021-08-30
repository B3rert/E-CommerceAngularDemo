import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundProductComponentComponent } from './not-found-product-component.component';

describe('NotFoundProductComponentComponent', () => {
  let component: NotFoundProductComponentComponent;
  let fixture: ComponentFixture<NotFoundProductComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundProductComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundProductComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
