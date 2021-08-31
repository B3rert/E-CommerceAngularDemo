import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarSidenavComponentComponent } from './toolbar-sidenav-component.component';

describe('ToolbarSidenavComponentComponent', () => {
  let component: ToolbarSidenavComponentComponent;
  let fixture: ComponentFixture<ToolbarSidenavComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarSidenavComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarSidenavComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
