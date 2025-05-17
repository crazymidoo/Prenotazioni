import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prenotazione } from '../../model/prenotazione.model';

@Component({
  selector: 'app-dettagli-prenotazione',
  imports: [CommonModule],
  templateUrl: './dettagli-prenotazione.component.html',
  styleUrl: './dettagli-prenotazione.component.css'
})
export class DettagliPrenotazioneComponent {
  @Input() prenotazione! : Prenotazione;
  allunga: boolean = false;
  estendi(){
    this.allunga = !this.allunga
  }
}
