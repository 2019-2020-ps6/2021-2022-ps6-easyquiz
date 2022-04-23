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

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private userService: UserService, private settingsService: SettingService) {

    document.addEventListener('keydown', (event) => {
      const nomTouche = event.key;
      // tslint:disable-next-line:no-shadowed-variable
      const synthe = window.speechSynthesis;
      let utterThis = new SpeechSynthesisUtterance('Hello');

      this.rate = document.getElementById('rate').value;



      if (nomTouche === 'Enter'){
        utterThis = new SpeechSynthesisUtterance('Après la lecture de chaque question, les réponses sont données dans cet ordre : haut, droite, bas, gauche. Appuyez sur la flèche correspondant à la réponse pour valider. Vous pouvez aussi appuyer sur espace pour réécouter la question.' + 'Début du quizz.' );
        utterThis.lang = 'fr-FR';
        utterThis.rate = this.rate;
        synthe.speak(utterThis);
      }
      if (nomTouche === ' ') {
        // tslint:disable-next-line:max-line-length
        utterThis = new SpeechSynthesisUtterance(this.question + '. ' + this.answerList[0].value + '. ' + this.answerList[1].value + '. ' + this.answerList[2].value + '. ' + this.answerList[3].value + '. ');
        utterThis.lang = 'fr-FR';
        utterThis.rate = this.rate;
        synthe.speak(utterThis);
      }
      if (nomTouche === 'ArrowRight') {
        this.messages(this.answerList[1].isCorrect);
        utterThis = new SpeechSynthesisUtterance(this.answerList[1].value + this.message);
        utterThis.lang = 'fr-FR';
        utterThis.rate = this.rate;
        synthe.speak(utterThis);
        this.correct(this.answerList[1].isCorrect);
      }
      if (nomTouche === 'ArrowLeft') {
        this.messages(this.answerList[3].isCorrect);
        utterThis = new SpeechSynthesisUtterance(
          this.answerList[3].value + this.message );
        utterThis.lang = 'fr-FR';
        utterThis.rate = this.rate;
        synthe.speak(utterThis);
        this.correct(this.answerList[3].isCorrect);

      }
      if (nomTouche === 'ArrowUp') {
        this.messages(this.answerList[0].isCorrect);
        utterThis = new SpeechSynthesisUtterance( this.answerList[0].value + this.message);
        utterThis.lang = 'fr-FR';
        utterThis.rate = this.rate;
        synthe.speak(utterThis);
        this.correct(this.answerList[0].isCorrect);

      }
      if (nomTouche === 'ArrowDown') {
        this.messages(this.answerList[2].isCorrect);
        utterThis = new SpeechSynthesisUtterance( this.answerList[2].value + this.message);
        utterThis.lang = 'fr-FR';
        utterThis.rate = this.rate;
        synthe.speak(utterThis);
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
    this.rate = document.getElementById('rate').value;
    if (this.nbQuestions === 0 ){
      this.finPartie(0);
    }
    const synth2 = window.speechSynthesis;
    // tslint:disable-next-line:max-line-length
    const utterThise2 = new SpeechSynthesisUtterance('Après la lecture de chaque question, les réponses sont données dans cet ordre : haut, droite, bas, gauche. Appuyez sur la flèche correspondant à la réponse pour valider. Vous pouvez aussi appuyer sur espace pour réécouter la question.' + 'Début du quizz.');
    utterThise2.lang = 'fr-FR';
    utterThise2.rate = this.rate;
    synth2.speak(utterThise2);
    this.reset();
  }

  finPartie(event): void{
    this.fin.emit(this.nbQuestions);
  }

  reset(): void {
    this.choice = this.settingsService.getSelectedChoice();
    this.feedbackAction = '';
    this.activeFeedback = false;
    this.aJuste = false;
    this.jeuActif = true;
    this.question = this.questionTotale.label;
    this.answerList = this.questionTotale.answers;
    const synth = window.speechSynthesis;
    // tslint:disable-next-line:max-line-length
    const utterThise = new SpeechSynthesisUtterance(this.question + '. ' + this.answerList[0].value + '. ' + this.answerList[1].value + '. ' + this.answerList[2].value + '. ' + this.answerList[3].value + '. ');
    utterThise.lang = 'fr-FR';
    utterThise.rate = this.rate;
    synth.speak(utterThise);


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


}


