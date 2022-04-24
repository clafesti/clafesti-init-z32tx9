import { Component, OnInit } from '@angular/core';
import { AutenticaService } from '../common/autentica.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  naviga: string;
  username: string="";
  passwd: string="";

  //utilizzo il servizio appena costruito
  constructor(public servizioAb: AutenticaService) {}

  ngOnInit() {
    this.naviga = 'NON abilitato';
    this.servizioAb.setAbilitato(false);
  }

  abilita() {
    //autentica input
    if (this.username.toUpperCase() == 'IO' && this.passwd == 'me') {
      this.naviga = 'Abilitato';
      this.servizioAb.setAbilitato(true);
    }
  }
}
