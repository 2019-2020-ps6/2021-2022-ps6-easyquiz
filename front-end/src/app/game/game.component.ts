/* tslint:disable:whitespace no-trailing-whitespace */
import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Answer, Question} from '../../models/question.model';
import {DOCUMENT} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";
import {SettingService} from '../../services/setting.service';
import {Choice} from './settings/game-setting/choice/models/choice.model';
import {Quiz} from "../../models/quiz.model";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  @Input()
  tout: Question[];

  @Output()
  juste: EventEmitter<boolean> = new EventEmitter();


  public question: string;
  public answerList: Answer[] = [];
  public photoURL: string;
  public feedbackAction: string;
  public activeFeedback: boolean;
  public jeuActif: boolean = true;
  public choice: Choice;
  public aJuste: boolean;
  public questionTotale: Question;


  constructor(@Inject(DOCUMENT) private _document: Document, private router: Router,
              private settingsService: SettingService
  ) {
  }


  ngOnInit(): void {
    this.questionTotale = this.tout[0];
    this.reset();
  }


  reset(): void {
    this.choice = this.settingsService.getSelectedChoice();
    this.feedbackAction = "";
    this.activeFeedback = false;
    this.aJuste = false;
    this.jeuActif = true;
    this.question = this.questionTotale.label;
    this.photoURL = this.questionTotale.urlIMG;
    this.answerList = this.questionTotale.answers;
  }

  gestionClick(repChoisie: boolean): void {


    this.jeuActif = false;
    if (repChoisie) {
      console.log("Bonne réponse");
      this.aJuste = true;
      this.feedbackAction = "Bravo";
    } else {
      console.log("raté");
      this.feedbackAction = "Dommage"
    }
    this.activeFeedback = true;
  }

  zoom(): void {
    console.log("on envoie "+this.photoURL);
    this.router.navigate(['/game/zoom/'], {state: {link: this.photoURL}});
  }

  refresh(): void {
    this.juste.emit(this.aJuste);
    this.tout.shift();
    this.questionTotale = this.tout[0];

    if(this.tout.length===0){
      this.router.navigate(['/fin/']);
    }
    else {

      this.questionTotale = this.tout[0];

      console.log(this.tout[0]);

      console.log(this.questionTotale);

      console.log("cest le new");
      this.reset();
    }

    //this._document.defaultView.location.reload();
  }


}
