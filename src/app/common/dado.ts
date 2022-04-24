export class Dado {
  nomeImg: string; //nome dell'img visualizzata. Dorso o faccia dado
  valore: number; //valore della faccia
  dorso: boolean; //c'è il dorso (true) oppure la faccia
  numeroCarta: number;
  check: boolean; //true -> da NON modificare     false -> rilanciare il dado

  nomeFile: string[] = [
    'poker-dice-nine.png',
    'poker-dice-ten.png',
    'poker-dice-jack.png',
    'poker-dice-queen.png',
    'poker-dice-king.png',
    'poker-dice-ace.png'
  ];

  //crea un dado assegnando un'immagine a caso tra le memorizzate
  constructor() {
    this.dorso = true; //imposta il dorso come default
    this.check = false; //aggiorno l'immagine
    this.generaDado(); //genera la faccia del dado
  }

  //Genera un nuovo dado e associa l'immagine e il suo valore. Il valore è dato dalla posizione secondo uno schema riportato nel doc collegato
  generaDado() {
    if (!this.check) {  //se non è selezionato, posso rilanciare
      //genera un numero da 0 a 6 (NON compreso) da associare alla faccia del dado da visualizzare
      this.numeroCarta = Math.trunc(Math.random() * 6);

    //SOSTITUISCE lo switch sotto, ma il concetto è quello
      this.valore = Math.pow(10,this.numeroCarta);
      // switch (this.numeroCarta) { //in base alla carta assegno un valore posizionale
      //   case 0:
      //     this.valore = 1;
      //     break;
      //   case 1:
      //     this.valore = 10;
      //     break;
      //    ............
      //   case 5:
      //     this.valore = 100000;
      //     break;
      // }
    }
    if (this.dorso)   //visualizza il "dorso" oppure il valore
      this.nomeImg = 'dado.png';
    else
      this.nomeImg = this.nomeFile[this.numeroCarta]; //metto l'immagine corretta
  }



}
