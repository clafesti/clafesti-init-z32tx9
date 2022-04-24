import { Component, OnInit } from '@angular/core';
import { AutenticaService } from '../common/autentica.service';

@Component({
  selector: 'app-dadi2gioc',
  templateUrl: './dadi2gioc.component.html',
  styleUrls: ['./dadi2gioc.component.css']
})
export class Dadi2giocComponent implements OnInit {

  nome1: string;
  nome2: string;
  punt1: number;
  punt2: number;
  nGiocate: number;

  constructor(public servizio: AutenticaService) { }

  ngOnInit() {
    this.nGiocate=1;
  }

  resetta()
  {
    //Permette di passare un parametro modificato e quindi di rinfrescare il componente
    this.nGiocate++;

    //in Javascript si può aggiornare la pagina in questo modo. Molto meno performante
    //window.location.reload();
  }

  punti1(ppp: number)
  {
    this.punt1 = ppp;
//    this.abilita=!this.abilita;
  }

  punti2(ppp: number)
  {
    this.punt2 = ppp;
//    this.abilita=!this.abilita;
  }

  isAutorizzato():boolean
  {
    return this.servizio.getAbilitato();
  }

}