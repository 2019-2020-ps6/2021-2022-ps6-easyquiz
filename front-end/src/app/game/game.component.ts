/* tslint:disable:whitespace no-trailing-whitespace */
import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Answer, Question} from '../../models/question.model';
import {SettingService} from '../../services/setting.service';
import {Choice} from './settings/game-setting/choice/models/choice.model';
import {Router} from "@angular/router";
import {GameService} from "../../services/game.service";
import {QuizService} from "../../services/quiz.service";
import {Game} from "../../models/game.model";
import {Quiz} from "../../models/quiz.model";
import {Subject} from "rxjs";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit {


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
  private indice: number;
  private bonneRep : number;
  private data:any;




  constructor(private router: Router, private gameService : GameService,
              private settingsService: SettingService
  ) {

    this.data = this.router.getCurrentNavigation().extras.state.data;
    console.log("data vaut");
    console.log(this.data);

    console.log("JEXISTE");
      this.bonneRep = this.data.correct;
      this.indice = this.data.currentQuestion;
      this.questionTotale = this.data.questions[this.indice];
      this.nbQuestions = this.data.questions.length;
      if(this.nbQuestions===0){this.finPartie();}
      this.reset();
  }


  ngOnInit(): void {

  }


  reset(): void {
    console.log("passe reset");
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
      console.log("SUivant");
      this.aJuste = true;
      this.feedbackAction = "Suivant";
    } else {
      console.log("raté");
      this.feedbackAction = "Suivant"
    }
    this.activeFeedback = true;
  }

  zoom(): void {
    this.reBuildData();
    console.log("on envoie "+this.photoURL);
    this.router.navigate(['/game/zoom/'], {state: {link: this.photoURL, bgColor: this.choice.pageBackGround, data:this.data}});
  }

  refresh(): void {
    if(this.aJuste){this.bonneRep++;}
    this.indice++;

    if (this.indice === this.nbQuestions) {
      this.finPartie();
    } else {
      this.questionTotale = this.data.questions[this.indice];
      console.log("cest le new"+this.questionTotale.label);
      this.reset();
    }

  }

  finPartie(): void{
    this.reBuildData()
    this.router.navigate(['/fin/'], {state: {data : this.data}});
  }


  //Vaut qu'on build la on peut ajouter nous meme la maladie au debut ???
  reBuildData() : any {
    this.data = {
      "quizId": this.data.quizId,
      "userId": this.data.userId,
      "questions": this.data.questions,
      "currentQuestion": this.indice,
      "correct": this.bonneRep,
      "disease" : "cataracte",

    };

  }




}
