import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasComponentComponent } from './pruebas-component.component';

describe('PruebasComponentComponent', () => {
  let component: PruebasComponentComponent;
  let fixture: ComponentFixture<PruebasComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebasComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
