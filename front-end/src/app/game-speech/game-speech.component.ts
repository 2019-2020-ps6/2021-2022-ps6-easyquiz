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
  constructor(private route: ActivatedRoute, private userService: UserService, private settingsService: SettingService) {

    document.addEventListener('keydown', (event) => {
      const nomTouche = event.key;
      const synth = window.speechSynthesis;
      let utterThis = new SpeechSynthesisUtterance('Hello');

      // Ca me met une erreur, value existe pas dans HTML element, je te mets en commentaire pour l'instant
      //const rate = document.getElementById('rate').value;
      const rate=1;
      if (nomTouche === ' ') {
        utterThis = new SpeechSynthesisUtterance(this.question + this.answerList[0].value + this.answerList[1].value + this.answerList[2].value + this.answerList[3].value);
        utterThis.lang = 'fr-FR';
        utterThis.rate = rate;

        synth.speak(utterThis);
      }
      if (nomTouche === 'ArrowRight') {
        utterThis = new SpeechSynthesisUtterance(this.answerList[1].value + '. Vous avez choisi la mauvaise réponse !');
        utterThis.lang = 'fr-FR';
        utterThis.rate = rate;
        synth.speak(utterThis);
      }
      if (nomTouche === 'ArrowLeft') {
        utterThis = new SpeechSynthesisUtterance(
          this.answerList[3].value + '. Vous avez choisi la mauvaise réponse !' );
        utterThis.lang = 'fr-FR';
        utterThis.rate = rate;
        synth.speak(utterThis);
      }
      if (nomTouche === 'ArrowUp') {
        utterThis = new SpeechSynthesisUtterance( this.answerList[0].value + '. Vous avez choisi la mauvaise réponse !');
        utterThis.lang = 'fr-FR';
        utterThis.rate = rate;
        synth.speak(utterThis);
      }
      if (nomTouche === 'ArrowDown') {
        utterThis = new SpeechSynthesisUtterance( this.answerList[2].value + '. Vous avez choisi la bonne réponse !');
        utterThis.lang = 'fr-FR';
        utterThis.rate = rate;
        synth.speak(utterThis);
        this.aJuste = true;
        this.feedbackAction = 'Bravo';
        this.activeFeedback = true;
        this.refresh(event);
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
    if (this.nbQuestions === 0 ){
      this.finPartie(0);
    }
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
      //this._document.defaultView.location.reload();
    }
  }


}


