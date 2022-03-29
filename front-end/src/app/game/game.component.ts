/* tslint:disable:whitespace no-trailing-whitespace */
import {Component, Inject, OnInit} from '@angular/core';
import {Answer, Question} from '../../models/question.model';
import {DOCUMENT} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../services/quiz.service";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  public question: string;
  public answerList: Answer[]=[];
  public photoURL : string;
  public feedbackAction: string;
  public activeFeedback: boolean;
  public jeuActif: boolean =true;





  constructor( @Inject(DOCUMENT) private _document: Document,private router: Router){
    }


  ngOnInit(): void {
    this.feedbackAction="";
    this.activeFeedback=false;
    this.question = 'Quelle est la voiture sur la photo ?';
    this.photoURL = "https://www.autoscout24.fr/assets/auto/images/model/fiat/fiat-ritmo/fiat-ritmo-l-01.jpg";

    let Answer1: Answer = {
      value: "Audi Q5",
      isCorrect: false,
    };
    let Answer2: Answer = {
      value: "Fiat Ritmo",
      isCorrect: true,
    };
    let Answer3: Answer = {
      value: "2 Chevaux",
      isCorrect: false,
    };
    let Answer4: Answer = {
      value: "Fiat Panda",
      isCorrect: false,
    };
    this.answerList.push(Answer1,Answer2,Answer3,Answer4);
  }

  gestionClick(repChoisie: boolean): void{
    this.jeuActif=false;
      if(repChoisie){
        console.log("Bonne réponse");
        this.feedbackAction= "Bravo"
      }
      else{
        console.log("raté");
        this.feedbackAction= "Réessayer"
      }
      this.activeFeedback=true;
    }

  zoom(): void{
    this.router.navigate(['/game/zoom/']);
  }

    refresh(): void{
        this._document.defaultView.location.reload();
    }


}
