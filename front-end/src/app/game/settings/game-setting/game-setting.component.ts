import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../../models/quiz.model';

@Component({
  selector: 'app-game-setting',
  templateUrl: './game-setting.component.html',
  styleUrls: ['./game-setting.component.scss']
})
export class GameSettingComponent implements OnInit {

  @Input()
  quiz: Quiz;

  constructor() { }

  ngOnInit(): void {
  }

}
