import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogdata.interface';

@Component({
  selector: 'app-generic-actions-dialog',
  templateUrl: './generic-actions-dialog.component.html',
  styleUrls: ['./generic-actions-dialog.component.css']
})
export class GenericActionsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GenericActionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

    if (!data.verdadero) {
      data.verdadero = "Aceptar";
    } 
    
    if (!data.falso) {
      data.falso = "Cancelar";
    }
  }

  ngOnInit(): void {
  }

}
