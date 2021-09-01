import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingOutDialogComponent } from './sing-out-dialog.component';

describe('SingOutDialogComponent', () => {
  let component: SingOutDialogComponent;
  let fixture: ComponentFixture<SingOutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingOutDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingOutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
