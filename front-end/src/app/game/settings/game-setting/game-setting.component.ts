import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../../models/quiz.model';
import {Choice} from './choice/models/choice.model';

@Component({
  selector: 'app-game-setting',
  templateUrl: './game-setting.component.html',
  styleUrls: ['./game-setting.component.scss']
})
export class GameSettingComponent implements OnInit {

  @Input() quizToAdapt!: Quiz;

  choises!: Choice[];

  constructor() { }

  ngOnInit(): void {
    this.choises = [
      {
        urlImage: 'https://www.meilleure-innovation.com/wp-content/uploads/2021/02/logiciel-definition.jpg'
      },
      {
        urlImage: 'https://www.pyreweb.com/files/medias/images/Pages/creation_logiciel/ecrans-soft.png'
      }
    ];
  }

}
