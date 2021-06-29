import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaTipoComponent } from './tienda-tipo.component';

describe('TiendaTipoComponent', () => {
  let component: TiendaTipoComponent;
  let fixture: ComponentFixture<TiendaTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiendaTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
