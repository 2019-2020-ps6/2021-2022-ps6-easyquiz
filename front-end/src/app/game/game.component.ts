/* tslint:disable:whitespace no-trailing-whitespace */
import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {Answer, Question} from '../../models/question.model';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  public quiz: Quiz;
  public questionModel: Question;
  public question: string;
  public answerList: string[];



  constructor(){ }

  ngOnInit(): void {
    this.question = 'Quelle est la voiture représentée sur la photo ?';
    this.answerList = ['Audi Q5','Fiat Ritmo','2 Chevaux', 'Fiat Panda'];

  }

}
