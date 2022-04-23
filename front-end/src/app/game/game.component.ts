/* tslint:disable:whitespace no-trailing-whitespace */
import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Answer, Question} from '../../models/question.model';
import {DOCUMENT} from "@angular/common";
import {SettingService} from '../../services/setting.service';
import {Choice} from './settings/game-setting/choice/models/choice.model';
import {Router} from "@angular/router";


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

  @Output()
  fin: EventEmitter<number> = new EventEmitter();

  public question: string;
  public answerList: Answer[] = [];
  public photoURL: string;
  public feedbackAction: string;
  public activeFeedback: boolean;
  public jeuActif: boolean = true;
  public choice: Choice;
  public aJuste: boolean;
  public questionTotale: Question;
  public nbQuestions : number;
  private indice: number=0;

  constructor(@Inject(DOCUMENT) private _document: Document, private router: Router,
              private settingsService: SettingService
  ) {
  }


  ngOnInit(): void {
    this.questionTotale = this.tout[this.indice];
    this.nbQuestions = this.tout.length;
    if(this.nbQuestions===0){
      this.finPartie(0);
    }
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
      console.log("Bonne réponse =>");
      this.aJuste = true;
      this.feedbackAction = "Bravo";
    } else {
      console.log("raté");
      this.feedbackAction = "Dommage =>"
    }
    this.activeFeedback = true;
  }

  zoom(): void {
    console.log("on envoie "+this.photoURL);
    this.router.navigate(['/game/zoom/'], {state: {link: this.photoURL}});
  }

  refresh(event): void {
    this.juste.emit(this.aJuste);
    this.indice++;

    if (this.indice === this.tout.length) {
      this.finPartie(event);
    } else {
      this.questionTotale = this.tout[this.indice];
      console.log("cest le new"+this.questionTotale.label);
      this.reset();
      //this._document.defaultView.location.reload();
    }


  }

  finPartie(event): void{
    this.fin.emit(this.nbQuestions);
  }


}
