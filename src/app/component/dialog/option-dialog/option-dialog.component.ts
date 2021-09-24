import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogdata.interface';

@Component({
  selector: 'app-option-dialog',
  templateUrl: './option-dialog.component.html',
  styleUrls: ['./option-dialog.component.css']
})
export class OptionDialogComponent implements OnInit {
  favoriteSeason: any;
  seasons: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<OptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

    let elemento_asignado:number =+ sessionStorage.getItem("elemento_asignado")!;
   
    data.options.forEach((element: any) => {
      this.seasons.push(element);
      if (element.elemento_Asignado == elemento_asignado) {
        this.favoriteSeason = element;
      }
    });

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
   sessionStorage.setItem("elemento_asignado",this.favoriteSeason.elemento_Asignado.toString());
  }
    


}
