import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogdata.interface';

@Component({
  selector: 'app-option-multiple-dialog',
  templateUrl: './option-multiple-dialog.component.html',
  styleUrls: ['./option-multiple-dialog.component.css']
})
export class OptionMultipleDialogComponent implements OnInit {


  options_payment:FormGroup;
  jsonPayments = {};
  
  constructor(
    public dialogRef: MatDialogRef<OptionMultipleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {

    data.options.forEach((element: any) => {
      this.jsonPayments = Object.assign(this.jsonPayments, { [element]: false });
    });

    this.options_payment = this.fb.group(this.jsonPayments);
   
    if (!data.verdadero) {
      data.verdadero = "Aceptar";
    } 
    
    if (!data.falso) {
      data.falso = "Cancelar";
    }
    
   }

  ngOnInit(): void {
  }

  saveTipoPedido(){

    sessionStorage.setItem("payments_dialog", JSON.stringify(this.options_payment.value));
  }

}
