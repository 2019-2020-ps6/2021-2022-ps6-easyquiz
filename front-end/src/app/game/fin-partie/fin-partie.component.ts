import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model';
import {logger} from 'codelyzer/util/logger';
import {GameService} from "../../../services/game.service";

@Component({
  selector: 'app-fin-partie',
  templateUrl: './fin-partie.component.html',
  styleUrls: ['./fin-partie.component.scss']
})
export class FinPartieComponent implements OnInit {

  public nbGoodAnswer: number;
  public totalAnswer: number;
  public user: User;
  public id: string;
  public synth = window.speechSynthesis;
  private disease: string;
  public lecture = true;
  private idquiz: string;
  private data : any;

  // tslint:disable-next-line:variable-name
  constructor(private _location: Location, private router: Router, private route: ActivatedRoute, private gameService : GameService) {
    this.data = this.router.getCurrentNavigation().extras.state.data;
    this.nbGoodAnswer = this.data.correct;
    this.totalAnswer = this.data.questions.length;
    this.idquiz = this.data.quizId;


      console.log('FIN NOTRE MALADE' + this.data.disease);
      if (this.data.disease === 'cécité') {
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
      this.createInstance();

  }


  createInstance(): void{
    let obj : any;
    obj = {
      "quizId": this.data.quizId,
      "userId": this.data.userId,
      "nbQuestion": this.data.questions.length,
      "correct": this.data.correct,
    };

    this.gameService.addGame(obj);
    console.log('on vient de add obj : '); console.log(obj);

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
    //alert('ca se lance');
  }

  goBack(): void{
    this.synth.cancel();
    this.synth.pause();
    this.lecture = false;
    this.router.navigate(['/profile/' + this.data.userId]);
  }

  goPlayAgain(): void{
    this.synth.cancel();
    this.synth.pause();
    this.lecture = false;
    this.router.navigate(['/' + this.data.userId + '/theme']);

  }
}
