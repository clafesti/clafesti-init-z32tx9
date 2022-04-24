import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chiamaloc',
  templateUrl: './chiamaloc.component.html',
  styleUrls: ['./chiamaloc.component.css']
})
export class ChiamalocComponent implements OnInit {

  staCaricando: boolean;  //nel momento che sta caricando

  datiCanada: any=[];
//evento generato quando i dati sono pronti
  eventoDatiPronti = new Subject<boolean>();
  datiPronti: boolean;

  constructor(private miohttp:HttpClient) { }

  ngOnInit() {
    this.staCaricando = false; //all'inizio non sta caricando nulla

    this.datiPronti = false;
//sottoscrivo la possibilità di sentire quando arrivano i dati
    this.eventoDatiPronti.subscribe(dato => {
      this.datiPronti = dato;
    }) 
  }

//Chiamata GET ai dati dal governo Canadese. Impiega un certo tempo
  chiamaCanada() {
    this.staCaricando = true;
    this.datiPronti = false;
    this.miohttp.get("https://open.canada.ca/data/en/api/3/action/recently_changed_packages_activity_list").subscribe(dati=>{
      console.log(dati);
      this.datiCanada=dati; //memorizzo in array locale
      this.staCaricando = false;
 //ha finito di caricare i dati, quindi posso generare l'evento
      this.eventoDatiPronti.next(true);
    })
  }

}