import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTiendaComponentComponent } from './select-tienda-component.component';

describe('SelectTiendaComponentComponent', () => {
  let component: SelectTiendaComponentComponent;
  let fixture: ComponentFixture<SelectTiendaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTiendaComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTiendaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
