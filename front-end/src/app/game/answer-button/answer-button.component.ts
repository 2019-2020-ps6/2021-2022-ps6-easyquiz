import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Answer} from "../../../models/question.model";

@Component({
  selector: 'app-answer-button',
  templateUrl: './answer-button.component.html',
  styleUrls: ['./answer-button.component.scss']
})
export class AnswerButtonComponent implements OnInit {

  @Input()
  answer: Answer;

  @Input()
  rep: boolean;

  @Input()
  actif: boolean;

  @Output()
  emetteur: EventEmitter<boolean> = new EventEmitter();

  public aucunClick: boolean = true;
  public bonClick: boolean = false;
  public mauvaisClick: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.answer);
  }

  clickAnswer(event): void{
    console.log('Appui Bouton : '+this.answer.value);
    this.setColor();
    this.emetteur.emit(this.answer.isCorrect);

  }

  setColor(): void{
    this.aucunClick=false;
    console.log("On change la couleur")
    if(this.answer.isCorrect){
      this.bonClick=true;
    }
    else{
    this.mauvaisClick=true;
    }
  }

}
