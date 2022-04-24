import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Dado } from '../common/dado';

@Component({
  selector: 'app-dadi5',
  templateUrl: './dadi5.component.html',
  styleUrls: ['./dadi5.component.css'],
})

//visualizza 5 dadi (carte da poker) relative ad un giocatore
// facendo riferimento ad una classe Dado che gestisce tutte
// le operazioni possibili
export class Dadi5Component implements OnInit, OnChanges {
  @Input() nomeGiocatore: string; //nome del giocatore
  @Input() numGioc: number; //numero di giocate fornite da padre

  @Output() punteggio = new EventEmitter<number>(); //punteggio effettuato dal giocatore

  percorsoBase: string =
    'https://raw.githubusercontent.com/claudiofesti/immadadi/main/';
  visDadoInit: string;
  abilitato: boolean;

  dadi: Dado[] = [];
  valore: number;
  tmpUscita: string;

  bordo: string = 'bordoblu'; //serve per ngClass.

  //crea 5 dadi contenenti 5 img diverse
  constructor() {
    this.visDadoInit = this.percorsoBase + '/dado.png';
    this.dadi = [new Dado(), new Dado(), new Dado(), new Dado(), new Dado()];
    this.valore = 0;
  }

//serve per sapere quando vengono cambiati i parametri di ingresso
//In questo modo è possibile modificare la situazione in questo componente
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['numGioc'].isFirstChange()) {
    //   console.log('Primo cambio di valore');
    // } // Mostro l'attuale valore e quello precedente di numGioc
    // console.log('Valore attuale: ' + changes['numGioc'].currentValue);
    // console.log('Valore prec. ' + changes['numGioc'].previousValue);

    if (changes['numGioc'].currentValue != changes['numGioc'].previousValue)
      this.abilitato=false;
  }

  ngOnInit() {}

  //Lancio dei 6 dadi completi. Se un dado ha il check attivo, non viene
  //  cambiata la faccia presente
  giocata() {
    this.abilitato = true;
    for (let i: number = 0; i < this.dadi.length; i++) {
      this.dadi[i].dorso = false;
      this.dadi[i].generaDado();
    }

    this.valore = this.calcolaGiocata(); //costruisce un valore "pesato"
    this.calcolaPunti();

    // this.abilitato = !this.abilitato;
    // //In base al valore di "abilitato", la var bordo può contenere una classe o l'altra
    // this.bordo = this.abilitato? 'bordoblu':'bordorosso';

    this.punteggio.emit(this.valore);
  }

  calcolaGiocata(): number {
    let somma: number = 0; //valore dei 5 dadi estratti

    for (let i: number = 0; i < this.dadi.length; i++) {
      //Somma i valori posizionali che poi mi serviranno nella stringa
      somma += this.dadi[i].valore;
    }
    return somma;
  }

  //dal valore calcolato secondo il metodo posizionale, calcola un punteggio relativo
  calcolaPunti() {
    //normalizzo la stringa a 6 caratteri mettendo gli zeri davanti
    //aggiungo gli zeri davanti al valore trasformato in stringa
    let miaStringa = '000000' + this.valore.toString();
    //estraggo una sottostringa partendo dalla lunghezza della stringa, 6 char indietro
    miaStringa = miaStringa.substring(miaStringa.length - 6);

    let numZeri = this.contaZeri(miaStringa);

    switch (numZeri) {
      case 1:
        this.tmpUscita = this.calcolaScala(miaStringa);
        break;
      case 2:
        this.tmpUscita = this.calcolaCoppia(miaStringa);
        break;
      case 3: //verifica se Tris o DoppiaCoppia. Se tris contiene un 3
        if (miaStringa.indexOf('3') >= 0)
          this.tmpUscita = this.calcolaTris(miaStringa);
        else this.tmpUscita = this.calcolaDoppiaCoppia(miaStringa);
        break;

      case 4:
        if (miaStringa.indexOf('4') >= 0)
          this.tmpUscita = this.calcolaPoker(miaStringa);
        else this.tmpUscita = this.calcolaFull(miaStringa);
        break;
      case 5:
        this.tmpUscita = this.pokerissimo(miaStringa);
        break;
    }
  }

  //A POSTO
  pokerissimo(miaStringa: string): string {
    return 'Pokerissimo p. ' + (80 + (5 - miaStringa.indexOf('5')));
  }

  //A POSTO
  calcolaPoker(miaStringa: string): string {
    let str =
      'Poker p. ' +
      (70 + (5 - miaStringa.indexOf('4')) + (5 - miaStringa.indexOf('1')) / 10);

    return str;
  }

  //A POSTO
  calcolaFull(miaStringa: string): string {
    return (
      'Full p. ' +
      (60 + (5 - miaStringa.indexOf('3')) + (5 - miaStringa.indexOf('2')) / 10)
    );
  }

  //A POSTO
  calcolaDoppiaCoppia(miaStringa: string): string {
    //ricerco il primo due della stringa. Quello + alto
    return (
      'Doppia Coppia p. ' +
      (20 +
        (5 - miaStringa.indexOf('2')) +
        (5 - miaStringa.lastIndexOf('2')) / 10 +
        (5 - miaStringa.indexOf('1')) / 100)
    );
  }

  //A POSTO
  calcolaTris(miaStringa: string): string {
    //ricerco il 3 nella stringa
    return (
      'Tris p. ' +
      (30 +
        (5 - miaStringa.indexOf('3')) +
        (5 - miaStringa.indexOf('1')) / 10 +
        (5 - miaStringa.lastIndexOf('1')) / 100)
    );
  }

  //verifica il punteggio della coppia
  calcolaCoppia(miaStringa: string): string {
    //in base alla posizione restituisce il punteggio
    return 'coppia p. ' + (10 + (5 - miaStringa.indexOf('2')));
  }

  //verifica il punteggio dato dalla scala
  calcolaScala(str: string): string {
    if (str.startsWith('0')) return 'scala minima p. 50';
    if (str.endsWith('0')) return 'scala massima p. 40';
    //verifica qual è la carta più alta
    return 'valore max ' + this.maxValore();
  }

  //conta il numero di zeri contenuti in una stringa
  contaZeri(stringa: string) {
    let count = 0;
    for (let i = 0; i < stringa.length; i++) if (stringa[i] == '0') count++;
    return count;
  }

  //calcola il valore massimo dei dadi presenti
  maxValore(): number {
    let max = -1;
    for (let i = 0; i < this.dadi.length; i++) {
      if (max < this.dadi[i].numeroCarta) max = this.dadi[i].numeroCarta;
    }
    return max;
  }
}
