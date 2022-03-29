import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../../models/quiz.model';
import {Choice} from './choice/models/choice.model';
import {SettingService} from '../../../../services/setting.service';

@Component({
  selector: 'app-game-setting',
  templateUrl: './game-setting.component.html',
  styleUrls: ['./game-setting.component.scss']
})
export class GameSettingComponent implements OnInit {

  @Input() quizToAdapt!: Quiz;

  choises!: Choice[];

  constructor(private settingService: SettingService) {

}

  ngOnInit(): void {
    this.choises = this.settingService.choises;
  }

}
