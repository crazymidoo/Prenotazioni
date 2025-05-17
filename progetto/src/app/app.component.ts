import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Prenotazione } from '../model/prenotazione.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ListaPrenotazioniComponent } from './lista-prenotazioni/lista-prenotazioni.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListaPrenotazioniComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bonura';
  vettPrenotazioni: Prenotazione[] = [];
  http: HttpClient;
  o!: Observable<Prenotazione[]>;
  oPost! : Observable<any>;
  postData : any;
  loading: boolean = false;

  constructor(http: HttpClient) {
    this.http = http;
    this.loading = true;
    this.o = this.http.get<Prenotazione[]>('https://my-json-server.typicode.com/malizia-g/verificaPrenotazioni/prenotazioni');
    this.o.subscribe(this.getData);
  }
  getData = (d: Prenotazione[]) => {
    this.vettPrenotazioni = d;
    console.log(this.vettPrenotazioni)
    this.loading = false;
  }



    makePost(pren : Prenotazione): void {
    let dataToSend = JSON.stringify({ 
      nome: pren.nome,
      cognome: pren.cognome,
      dataPrenotazione: pren.data,
      oraprenotazione: pren.ora,
    });
    this.loading = true;
    this.oPost = this.http.post<any>('https://my-json-server.typicode.com/malizia-g/verificaPrenotazioni/prenotazioni', dataToSend)
    this.oPost.subscribe(this.getPostResponse);
  }

   getPostResponse = (d : any) => {
    this.postData = d;
    this.loading = false;
    console.log(d);
  }
  salva(nome: HTMLInputElement, cognome: HTMLInputElement, indirizzo: HTMLInputElement, telefono: HTMLInputElement, email: HTMLInputElement, dataprenotazione: HTMLInputElement, oraprenotazione: HTMLInputElement): boolean {
    console.log(nome.value, cognome.value, indirizzo.value, telefono.value, email.value, dataprenotazione.value, oraprenotazione.value)
    let pren = new Prenotazione (nome.value, cognome.value, indirizzo.value, telefono.value, email.value, dataprenotazione.value, oraprenotazione.value)
    this.vettPrenotazioni.push(pren);
    this.makePost(pren)
    return false;
  }
}
