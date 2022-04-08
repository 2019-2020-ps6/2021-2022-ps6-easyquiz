import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';

// @ts-ignore
// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-game-speech',
  templateUrl: './game-speech.component.html',
  styleUrls: ['./game-speech.component.scss',  ],
})
export class GameSpeechComponent implements OnInit {
  constructor(private route: ActivatedRoute, private userService: UserService) {

    document.addEventListener('keydown', (event) => {
      const nomTouche = event.key;
      const synth = window.speechSynthesis;
      let utterThis = new SpeechSynthesisUtterance('Hello');

      const rate = document.getElementById('rate').value;

      if (nomTouche === ' ') {
        utterThis = new SpeechSynthesisUtterance('La premiere question est : Quel célèbre dictateur dirigea l’URSS du milieu des années 1920 à 1953 ?   Lénine. Staline. Molotov. Trotski');
        utterThis.lang = 'fr-FR';
        utterThis.rate = rate;

        synth.speak(utterThis);
      }
      if (nomTouche === 'ArrowRight') {
        utterThis = new SpeechSynthesisUtterance(document.getElementById('droite').textContent
          + '. Vous avez choisi la mauvaise réponse !');
        utterThis.lang = 'fr-FR';
        utterThis.rate = rate;
        synth.speak(utterThis);
        alert('Je choisis la réponse de droite');
      }
      if (nomTouche === 'ArrowLeft') {
        utterThis = new SpeechSynthesisUtterance(document.getElementById('gauche').textContent
          + '. Vous avez choisi la mauvaise réponse !' );
        utterThis.lang = 'fr-FR';
        utterThis.rate = rate;
        synth.speak(utterThis);
        alert('Je choisis la réponse de gauche');
      }
      if (nomTouche === 'ArrowUp') {
        utterThis = new SpeechSynthesisUtterance(document.getElementById('haut').textContent + '. Vous avez choisi la mauvaise réponse !');
        utterThis.lang = 'fr-FR';
        utterThis.rate = rate;
        synth.speak(utterThis);
        alert('Je choisis la réponse du haut');
      }
      if (nomTouche === 'ArrowDown') {
        utterThis = new SpeechSynthesisUtterance(document.getElementById('bas').textContent + '. Vous avez choisi la bonne réponse !');
        utterThis.lang = 'fr-FR';
        utterThis.rate = rate;
        synth.speak(utterThis);
        alert('Je choisis la réponse du bas');
      }
    }, true);


    document.getElementById('rate'); {

    }

    this.userService.userSelected$.subscribe((user) => this.user = user);
  }


  public user: User;



  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
  }


}


