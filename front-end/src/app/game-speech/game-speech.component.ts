import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Answer, Question} from '../../models/question.model';
import {DOCUMENT} from '@angular/common';
import {SettingService} from '../../services/setting.service';
// @ts-ignore
import {Choice} from './settings/game-setting/choice/models/choice.model';
import {Game} from '../../models/game.model';
import {GameService} from '../../services/game.service';
import {QuizService} from '../../services/quiz.service';

// @ts-ignore
// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-game-speech',
  templateUrl: './game-speech.component.html',
  styleUrls: ['./game-speech.component.scss',  ],
})
export class GameSpeechComponent implements OnInit {


  public question: string;
  public answerList: Answer[] = [];
  public feedbackAction: string;
  public activeFeedback: boolean;
  public jeuActif = true;
  public choice: Choice;
  public aJuste: boolean;
  public questionTotale: Question;
  public nbQuestions: number;
  public message: string;
  public rate: number;
  public synthe = window.speechSynthesis;
  public buttonColorhaut = '#3d3b3b';
  public buttonColorbas = '#3d3b3b';
  public buttonColordroit = '#3d3b3b';
  public buttonColorgauche = '#3d3b3b';
  public colorhaut = '#ff7f50';
  public colorbas = '#ff7f50';
  public colordroit = '#ff7f50';
  public colorgauche = '#ff7f50';
  public bonneReponse = '. La bonne réponse était: ';
  public keydownEventDate: Date | null = null;
  public derniereEvent: Date;
  public compter = 0;
  private game: Game;
  private tout: Question[];

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private gameService: GameService, private quizService: QuizService, private userService: UserService, private settingsService: SettingService) {
    this.synthe.cancel();
    this.synthe.resume();

    console.log('passe constructeur');
    this.gameService.game$.subscribe( (game) => {
      this.game = game;
      console.log('GAME ID vaut' + this.game.id);
      this.tout = this.quizService.getCourant().questions;
      console.log('on a recup' + this.tout.length);
      this.debut();
    });

    document.addEventListener('keydown', (event) => {
      const nomTouche = event.key;
      if (this.keydownEventDate === null){
        this.keydownEventDate = new Date();
        if (this.compter === 0 || this.keydownEventDate.getTime() - this.derniereEvent.getTime() > 3000){ this.lecture(nomTouche); }
        this.compter = 0;
      }else{
        const dateNow = new Date();
        if (dateNow.getTime() - this.keydownEventDate.getTime() > 3000) {
          this.lecture(nomTouche);
          this.keydownEventDate = null;
          this.compter = 1;
          this.derniereEvent = new Date();
        }
      }
    }, true);


    document.getElementById('rate'); {
    }

    this.userService.userSelected$.subscribe((user) => this.user = user);
  }


  public user: User;


  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');
    // this.userService.setSelectedUser(id);
    console.log('coucou');
    this.rate = Number((document.getElementById('rate') as HTMLInputElement).value);
    // tslint:disable-next-line:max-line-length
    const utterThise2 = new SpeechSynthesisUtterance('Après la lecture de chaque question, les réponses sont données dans cet ordre : haut, droite, bas, gauche. Appuyez sur la flèche correspondant à la réponse pour valider. Vous pouvez aussi appuyer sur espace pour réécouter la question. ' + 'Début du quizz.');
    utterThise2.lang = 'fr-FR';
    utterThise2.rate = this.rate;
    this.synthe.speak(utterThise2);
  }

  debut(): void{
    console.log('on passe debut avec ' + this.game.currentQuestion);
    this.questionTotale = this.tout[this.game.currentQuestion];
    this.nbQuestions = this.tout.length;
    if (this.nbQuestions === 0){
      this.finPartie();
    }else{
      this.reset();
    }
  }

  finPartie(): void{
    alert('go a la fin');
    this.synthe.cancel();
    console.log('FIN DE PARTIE');
    console.log('correct vaut ici ' + this.game.correct);
    console.log('game vaut'); console.log(this.game);
    this.router.navigate(['/fin/'], {state: {nb: this.game.correct, tot: this.game.nbQuestion, idUser: this.game.userId}});  }

  reset(): void {
    this.choice = this.settingsService.getSelectedChoice();
    this.feedbackAction = '';
    this.activeFeedback = false;
    this.aJuste = false;
    this.jeuActif = true;
    this.question = this.questionTotale.label;
    this.answerList = this.questionTotale.answers;
  }

  async refresh(): Promise<void> {
    console.log('avant modify ' + this.game.currentQuestion);
    await this.gameService.modify(this.aJuste);
    console.log('thread1');
    console.log(this.game.currentQuestion);
    alert(this.game.currentQuestion);

    console.log('on a ' + this.game.currentQuestion + ' et ' + this.tout.length);
    if (this.game.currentQuestion === this.tout.length) {
      this.finPartie();
    } else {
      this.questionTotale = this.tout[this.game.currentQuestion];
      console.log('cest le new' + this.questionTotale.label);
      //this.reset();
      this.resetColor();
      this.synthe.cancel();
      // tslint:disable-next-line:max-line-length
      const utterThise = new SpeechSynthesisUtterance(this.question + '. ' + this.answerList[0].value + '. ' + this.answerList[1].value + '. ' + this.answerList[2].value + '. ' + this.answerList[3].value + '. ');
      utterThise.lang = 'fr-FR';
      utterThise.rate = this.rate;
      this.synthe.speak(utterThise);
      // this._document.defaultView.location.reload();
    }

  }

  correct(reponse): void {
    if (reponse){
      this.aJuste = true;
      this.feedbackAction = 'Bravo';
    }else{
      this.feedbackAction = 'Dommage =>';
      this.aJuste = false;
    }
    this.activeFeedback = true;
    setTimeout(() => {
      this.synthe.cancel();
      this.refresh();
    }, 7000);
  }

  messages(reponse): void {
    if (reponse){
      this.message = '. Vous avez choisi la bonne réponse. ';
    }else{
      this.message = '. Vous avez choisi la mauvaise réponse. ';
    }
  }

  resetColor(): void {
  this.buttonColorhaut = '#3d3b3b';
  this.buttonColorbas = '#3d3b3b';
  this.buttonColordroit = '#3d3b3b';
  this.buttonColorgauche = '#3d3b3b';
  this.colorhaut = '#ff7f50';
  this.colorbas = '#ff7f50';
  this.colordroit = '#ff7f50';
  this.colorgauche = '#ff7f50';
  }

  reponseCorrect(reponse): string {
    if (reponse){
      return ' ';
    }else{
      if (this.answerList[0].isCorrect){
        return this.bonneReponse + this.answerList[0].value; }
      if (this.answerList[1].isCorrect){
        return this.bonneReponse + this.answerList[1].value; }
      if (this.answerList[2].isCorrect){
        return this.bonneReponse + this.answerList[2].value; }
      else { return this.bonneReponse + this.answerList[3].value; }
    }
  }

  lecture(nomTouche): void {
    // tslint:disable-next-line:no-shadowed-variable
    let utterThis = new SpeechSynthesisUtterance('Hello');

    this.rate = Number((document.getElementById('rate') as HTMLInputElement).value);
    if (nomTouche === 'Enter'){
      this.synthe.cancel();
      utterThis = new SpeechSynthesisUtterance('Après la lecture de chaque question, les réponses sont données dans cet ordre : haut, droite, bas, gauche. Appuyez sur la flèche correspondant à la réponse pour valider. Vous pouvez aussi appuyer sur espace pour réécouter la question.' + 'Début du quizz.' );
      utterThis.lang = 'fr-FR';
      utterThis.rate = this.rate;
      this.synthe.speak(utterThis);
    }
    if (nomTouche === ' ') {
      this.synthe.cancel();
      // tslint:disable-next-line:max-line-length
      utterThis = new SpeechSynthesisUtterance(this.question + '. ' + this.answerList[0].value + '. ' + this.answerList[1].value + '. ' + this.answerList[2].value + '. ' + this.answerList[3].value + '. ');
      utterThis.lang = 'fr-FR';
      utterThis.rate = this.rate;
      this.synthe.speak(utterThis);
    }
    if (nomTouche === 'ArrowRight') {
      const reponse = this.answerList[1].isCorrect;
      this.synthe.cancel();
      if (reponse) {
        this.buttonColordroit = 'forestgreen';
        this.colordroit = '#FFFFFF';
      }else{
        this.buttonColordroit = '#F35757FF';
        this.colordroit = '#FFFFFF';
      }
      this.messages(reponse);
      utterThis = new SpeechSynthesisUtterance(this.answerList[1].value + this.message + this.reponseCorrect(reponse));
      utterThis.lang = 'fr-FR';
      utterThis.rate = this.rate;
      this.synthe.speak(utterThis);
      this.correct(reponse);
    }
    if (nomTouche === 'ArrowLeft') {
      const reponse = this.answerList[3].isCorrect;
      this.synthe.cancel();
      if (reponse) {
        this.buttonColorgauche = 'forestgreen';
        this.colorgauche = '#FFFFFF';
      }else{
        this.buttonColorgauche = '#F35757FF';
        this.colorgauche = '#FFFFFF';
      }
      this.messages(reponse);
      utterThis = new SpeechSynthesisUtterance(
        this.answerList[3].value + this.message + this.reponseCorrect(reponse) );
      utterThis.lang = 'fr-FR';
      utterThis.rate = this.rate;
      this.synthe.speak(utterThis);
      this.correct(reponse);

    }
    if (nomTouche === 'ArrowUp') {
      const reponse = this.answerList[0].isCorrect;
      this.synthe.cancel();
      if (reponse) {
        this.buttonColorhaut = 'forestgreen';
        this.colorhaut = '#FFFFFF';
      }else{
        this.buttonColorhaut = '#F35757FF';
        this.colorhaut = '#FFFFFF';
      }
      this.messages(reponse);
      utterThis = new SpeechSynthesisUtterance( this.answerList[0].value + this.message + this.reponseCorrect(reponse));
      utterThis.lang = 'fr-FR';
      utterThis.rate = this.rate;
      this.synthe.speak(utterThis);
      this.correct(reponse);

    }
    if (nomTouche === 'ArrowDown') {
      this.synthe.cancel();
      const reponse = this.answerList[2].isCorrect;
      this.messages(reponse);
      // tslint:disable-next-line:max-line-length
      utterThis = new SpeechSynthesisUtterance(this.answerList[2].value + this.message + this.reponseCorrect(reponse));
      utterThis.lang = 'fr-FR';
      utterThis.rate = this.rate;
      this.synthe.speak(utterThis);
      if (reponse) {
        this.buttonColorbas = 'forestgreen';
        this.colorbas = '#FFFFFF';
      } else {
        this.buttonColorbas = '#F35757FF';
        this.colorbas = '#FFFFFF';
      }
      this.correct(reponse);
    }
  }

}


