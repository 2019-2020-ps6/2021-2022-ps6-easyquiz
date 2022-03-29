import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../../models/quiz.model';
import {Choice} from './choice/models/choice.model';
import {SettingService} from '../../../../services/setting.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-game-setting',
  templateUrl: './game-setting.component.html',
  styleUrls: ['./game-setting.component.scss']
})
export class GameSettingComponent implements OnInit {

  @Input() quizToAdapt!: Quiz;

  choises!: Choice[];

  constructor(private settingService: SettingService, private _location: Location) {

}

  ngOnInit(): void {
    this.choises = this.settingService.choises;
  }

  goBack(): void {
    this._location.back();
  }

}
