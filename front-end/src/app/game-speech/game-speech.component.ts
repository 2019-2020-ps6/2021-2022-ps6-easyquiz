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
      if (nomTouche === ' ') {
        const utterThis = new SpeechSynthesisUtterance('La premiere question est : Quel célèbre dictateur dirigea l’URSS du milieu des années 1920 à 1953 ?   Lénine. Staline. Molotov. Trotski');
        utterThis.lang = 'fr-FR';
        synth.speak(utterThis);
      }
      if (nomTouche === 'ArrowRight') {
        alert('Je choisis la réponse de droite');
      }
      if (nomTouche === 'ArrowLeft') {
        alert('Je choisis la réponse de gauche');
      }
      if (nomTouche === 'ArrowUp') {
        alert('Je choisis la réponse du haut');
      }
      if (nomTouche === 'ArrowDown') {
        alert('Je choisis la réponse du bas');
      }
    }, true);




    this.userService.userSelected$.subscribe((user) => this.user = user);
  }


  public user: User;


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
  }


}


