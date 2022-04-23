import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {Answer, Question} from '../../models/question.model';
import {DOCUMENT} from '@angular/common';
import {SettingService} from '../../services/setting.service';
// @ts-ignore
import {Choice} from './settings/game-setting/choice/models/choice.model';

// @ts-ignore
// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-game-speech',
  templateUrl: './game-speech.component.html',
  styleUrls: ['./game-speech.component.scss',  ],
})
export class GameSpeechComponent implements OnInit {


  @Input()
  tout: Question[];

  @Output()
  juste: EventEmitter<boolean> = new EventEmitter();

  @Output()
  fin: EventEmitter<number> = new EventEmitter();

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



  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private userService: UserService, private settingsService: SettingService) {

    document.addEventListener('keydown', (event) => {
      const nomTouche = event.key;
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
        this.synthe.cancel();
        if (this.answerList[1].isCorrect) {
          this.buttonColordroit = 'forestgreen';
          this.colordroit = '#FFFFFF';
        }else{
          this.buttonColordroit = '#F35757FF';
          this.colordroit = '#FFFFFF';
        }
        this.messages(this.answerList[1].isCorrect);
        utterThis = new SpeechSynthesisUtterance(this.answerList[1].value + this.message);
        utterThis.lang = 'fr-FR';
        utterThis.rate = this.rate;
        this.synthe.speak(utterThis);
        this.correct(this.answerList[1].isCorrect);
      }
      if (nomTouche === 'ArrowLeft') {
        this.synthe.cancel();
        if (this.answerList[3].isCorrect) {
          this.buttonColorgauche = 'forestgreen';
          this.colorgauche = '#FFFFFF';
        }else{
          this.buttonColorgauche = '#F35757FF';
          this.colorgauche = '#FFFFFF';
        }
        this.messages(this.answerList[3].isCorrect);
        utterThis = new SpeechSynthesisUtterance(
          this.answerList[3].value + this.message );
        utterThis.lang = 'fr-FR';
        utterThis.rate = this.rate;
        this.synthe.speak(utterThis);
        this.correct(this.answerList[3].isCorrect);

      }
      if (nomTouche === 'ArrowUp') {
        this.synthe.cancel();
        if (this.answerList[0].isCorrect) {
          this.buttonColorhaut = 'forestgreen';
          this.colorhaut = '#FFFFFF';
        }else{
          this.buttonColorhaut = '#F35757FF';
          this.colorhaut = '#FFFFFF';
        }
        this.messages(this.answerList[0].isCorrect);
        utterThis = new SpeechSynthesisUtterance( this.answerList[0].value + this.message);
        utterThis.lang = 'fr-FR';
        utterThis.rate = this.rate;
        this.synthe.speak(utterThis);
        this.correct(this.answerList[0].isCorrect);

      }
      if (nomTouche === 'ArrowDown') {
        this.synthe.cancel();
        this.messages(this.answerList[2].isCorrect);
        utterThis = new SpeechSynthesisUtterance( this.answerList[2].value + this.message);
        utterThis.lang = 'fr-FR';
        utterThis.rate = this.rate;
        this.synthe.speak(utterThis);
        if (this.answerList[2].isCorrect) {
          this.buttonColorbas = 'forestgreen';
          this.colorbas = '#FFFFFF';
        }else{
          this.buttonColorbas = '#F35757FF';
          this.colorbas = '#FFFFFF';
        }
        this.correct(this.answerList[2].isCorrect);
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
    this.questionTotale = this.tout[0];
    this.answerList = this.questionTotale.answers;
    console.log('coucou');
    this.nbQuestions = this.tout.length;
    this.rate = Number((document.getElementById('rate') as HTMLInputElement).value);
    if (this.nbQuestions === 0 ){
      this.finPartie(0);
    }
    // tslint:disable-next-line:max-line-length
    const utterThise2 = new SpeechSynthesisUtterance('Après la lecture de chaque question, les réponses sont données dans cet ordre : haut, droite, bas, gauche. Appuyez sur la flèche correspondant à la réponse pour valider. Vous pouvez aussi appuyer sur espace pour réécouter la question.' + 'Début du quizz.');
    utterThise2.lang = 'fr-FR';
    utterThise2.rate = this.rate;
    this.synthe.speak(utterThise2);
    this.reset();
  }

  finPartie(event): void{
    this.fin.emit(this.nbQuestions);
    this.synthe.cancel();
  }

  reset(): void {
    this.choice = this.settingsService.getSelectedChoice();
    this.feedbackAction = '';
    this.activeFeedback = false;
    this.aJuste = false;
    this.jeuActif = true;
    this.question = this.questionTotale.label;
    this.answerList = this.questionTotale.answers;
    // tslint:disable-next-line:max-line-length
    const utterThise = new SpeechSynthesisUtterance(this.question + '. ' + this.answerList[0].value + '. ' + this.answerList[1].value + '. ' + this.answerList[2].value + '. ' + this.answerList[3].value + '. ');
    utterThise.lang = 'fr-FR';
    utterThise.rate = this.rate;
    this.synthe.speak(utterThise);
  }

  refresh(event): void {
    this.juste.emit(this.aJuste);
    this.tout.shift();
    this.questionTotale = this.tout[0];

    if (this.tout.length === 0) {
      this.finPartie(event);
    } else {
      this.questionTotale = this.tout[0];
      console.log('cest le new');
      this.reset();
      this.resetColor();
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
      this.refresh(event);
    }, 4000);
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


}


