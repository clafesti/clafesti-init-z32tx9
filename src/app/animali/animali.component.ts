import { Component, OnInit } from '@angular/core';
import { Animali } from '../common/animali';
import { AutenticaService } from '../common/autentica.service';

@Component({
  selector: 'app-animali',
  templateUrl: './animali.component.html',
  styleUrls: ['./animali.component.css']
})

export class AnimaliComponent implements OnInit {

  elencoAnimali: any;  //dichiarazione senza tipo
  //elencoAnimali: Animali[];  //dichiarazione con tipo associata

  constructor(public dati:AutenticaService) { }

  ngOnInit() {
    //associazione con l'elenco riportato nel servizio
    this.elencoAnimali = this.dati.elenco
  }

  isAutorizzato():boolean
  {
    return this.dati.getAbilitato();
  }

}