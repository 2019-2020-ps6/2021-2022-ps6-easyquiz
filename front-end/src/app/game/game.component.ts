/* tslint:disable:whitespace no-trailing-whitespace */
import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Answer, Question} from '../../models/question.model';
import {DOCUMENT} from "@angular/common";
import {SettingService} from '../../services/setting.service';
import {Choice} from './settings/game-setting/choice/models/choice.model';
import {Router} from "@angular/router";
import {GameService} from "../../services/game.service";
import {QuizService} from "../../services/quiz.service";
import {Game} from "../../models/game.model";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  //@Input()
  //tout: Question[];

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
  private game: Game;
  private tout:Question[];



  constructor(@Inject(DOCUMENT) private _document: Document, private router: Router, private gameService : GameService,
              private settingsService: SettingService, private quizService :QuizService
  ) {


    this.gameService.game$.subscribe( (game) => {
      this.game = game;
      console.log("GAME ID vaut" + this.game.id);
      console.log("on va lancer le quirservice subscribe");

      console.log("dans lance 2, quiz id "+this.game.quizId);
      //this.quizService.setSelectedQuiz(this.game.quizId);
      this.tout = this.quizService.getCourant().questions;
      console.log("on a recup" + this.tout.length);
      this.debut();
    });


  }

  ngOnInit(): void {

  }


  debut() : void{
    console.log("PASSSSE DEBUT");
    console.log("on lui PASSE "+this.game.currentQuestion);
    this.questionTotale = this.tout[this.game.currentQuestion];
    this.nbQuestions = this.tout.length;
    if(this.nbQuestions===0){
      this.finPartie();
    }
    this.reset();
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

  async refresh(): Promise<void> {

    console.log("avant modify "+this.game.currentQuestion);

    await this.gameService.modify(this.aJuste);

    console.log("thread1");

    console.log(this.game.currentQuestion);



    if (this.game.currentQuestion === this.tout.length) {
      this.finPartie();
    } else {
      this.questionTotale = this.tout[this.game.currentQuestion];
      console.log("cest le new"+this.questionTotale.label);
      this.reset();
      //this._document.defaultView.location.reload();
    }


  }

  finPartie(): void{
    console.log("correct vaut ici "+this.game.correct);
    console.log("game vaut");console.log(this.game);
    this.router.navigate(['/fin/'], {state: {nb: this.game.correct, tot: this.game.nbQuestion}});

  }


}
