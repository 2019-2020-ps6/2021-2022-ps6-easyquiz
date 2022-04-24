import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-fin-partie',
  templateUrl: './fin-partie.component.html',
  styleUrls: ['./fin-partie.component.scss']
})
export class FinPartieComponent implements OnInit {

  public nbGoodAnswer: number;
  public totalAnswer: number;
  public user: User;
  public iduser: string;
  public id: string;

  // tslint:disable-next-line:variable-name
  constructor(private _location: Location, private router: Router, private route: ActivatedRoute, private userService: UserService) {
    this.nbGoodAnswer = this.router.getCurrentNavigation().extras.state.nb;
    this.totalAnswer = this.router.getCurrentNavigation().extras.state.tot;
    this.iduser = this.router.getCurrentNavigation().extras.state.idUser;
    this.id = this.router.getCurrentNavigation().extras.state.id;

    this.userService.userSelected$.subscribe((user) => this.user = user);

    if (this.iduser !== 'Cataracte'){
      const synth = window.speechSynthesis;
      const utterThise = new SpeechSynthesisUtterance('Vous avez' + this.nbGoodAnswer + 'bonnes réponses sur' + this.totalAnswer + '. Pour rejouer un nouveau quizz appuyez sur la barre espace. Sinon appuyez sur la touche entrée pour arrêter et revenir au profil. ');
      utterThise.lang = 'fr-FR';
      synth.speak(utterThise);

      document.addEventListener('keydown', (event) => {
        const nomTouche = event.key;
        if (nomTouche === ' '){
          this.goPlayAgain();
        }
        if (nomTouche === 'Enter'){
          this.goBack();
        }
      }, true);

    }

  }




  ngOnInit(): void {
    console.log('this user : ' + this.id);
    this.userService.setSelectedUser(this.id);
  }

  goBack(): void{
    this.router.navigate(['/profile/' + this.user.id]);
  }

  goPlayAgain(): void{
    this.router.navigate(['/' + this.user.id + '/theme']);
  }
}
