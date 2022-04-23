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

  @Input()
  PhotoHere: boolean;

  @Output()
  emetteur: EventEmitter<boolean> = new EventEmitter();

  public aucunClick: boolean = true;
  public bonClick: boolean = false;
  public mauvaisClick: boolean = false;
  public width: string = '40%';

  constructor() { }

  ngOnInit(): void {
    console.log(this.answer);
    this.changeStyle();
  }

  changeStyle(): void {
    if (!this.PhotoHere) {
      this.width = '80%';
    }
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
