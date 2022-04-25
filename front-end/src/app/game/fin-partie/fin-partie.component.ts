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
  public synth = window.speechSynthesis;
  private disease: string;
  public lecture = true;


  // tslint:disable-next-line:variable-name
  constructor(private _location: Location, private router: Router, private route: ActivatedRoute, private userService: UserService) {
    this.nbGoodAnswer = this.router.getCurrentNavigation().extras.state.nb;
    this.totalAnswer = this.router.getCurrentNavigation().extras.state.tot;
    this.iduser = this.router.getCurrentNavigation().extras.state.idUser;

    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      this.disease = this.user.disease;
      console.log('FIN NOTRE MALADE' + this.user.disease);
      if (this.disease === 'Cécité') {
        console.log('ON VA LIRE');
        const utterThise = new SpeechSynthesisUtterance('Vous avez' + this.nbGoodAnswer + 'bonnes réponses sur' + this.totalAnswer + '. Pour rejouer un nouveau quizz appuyez sur la barre espace. Sinon appuyez sur la touche entrée pour arrêter et revenir au profil. ');
        utterThise.lang = 'fr-FR';
        this.synth.speak(utterThise);
        document.addEventListener('keydown', (event) => {
          const nomTouches = event.key;
          if (nomTouches === ' ' && this.lecture === true) {
            this.goPlayAgain();
          }
          if (nomTouches === 'Enter' && this.lecture === true) {
            this.goBack();
          }
          }, true);

        }
    });
  }


  /**
   *  this.obj = {
   *         "quizId": this.idQuiz,
   *         "userId": this.idUser,
   *         "nbQuestion": this.quiz.questions.length,
   *         "correct": 0,
   *         "currentQuestion": 0
   *       };
   *       this.gameService.addGame(this.obj);
   *       console.log('eh ho'); console.log(this.obj);
   */




  ngOnInit(): void {
    this.userService.setSelectedUser(this.iduser);
    alert('ca se lance');
  }

  goBack(): void{
    this.synth.cancel();
    this.synth.pause();
    this.lecture = false;
    this.router.navigate(['/profile/' + this.user.id]);
  }

  goPlayAgain(): void{
    this.synth.cancel();
    this.synth.pause();
    this.lecture = false;
    this.router.navigate(['/' + this.user.id + '/theme']);

  }
}
