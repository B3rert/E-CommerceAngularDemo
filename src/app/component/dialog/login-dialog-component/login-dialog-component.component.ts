import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-dialog-component',
  templateUrl: './login-dialog-component.component.html',
  styleUrls: ['./login-dialog-component.component.css']
})
export class LoginDialogComponentComponent implements OnInit {


  login = true;

  constructor() { }

  ngOnInit(): void {
  }

  loginView(){
    console.log('Aqui funciona') ; 
    this.login ? this.login = false : this.login = true;
  }
  

}
