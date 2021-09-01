import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericActionsDialogComponent } from './generic-actions-dialog.component';

describe('GenericActionsDialogComponent', () => {
  let component: GenericActionsDialogComponent;
  let fixture: ComponentFixture<GenericActionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericActionsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericActionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
