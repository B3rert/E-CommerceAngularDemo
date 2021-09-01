import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStoreDialogComponent } from './change-store-dialog.component';

describe('ChangeStoreDialogComponent', () => {
  let component: ChangeStoreDialogComponent;
  let fixture: ComponentFixture<ChangeStoreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeStoreDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeStoreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
