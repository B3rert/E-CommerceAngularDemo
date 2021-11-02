import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionMultipleDialogComponent } from './option-multiple-dialog.component';

describe('OptionMultipleDialogComponent', () => {
  let component: OptionMultipleDialogComponent;
  let fixture: ComponentFixture<OptionMultipleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionMultipleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionMultipleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
