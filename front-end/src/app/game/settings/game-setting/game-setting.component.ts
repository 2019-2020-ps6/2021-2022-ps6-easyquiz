import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../../models/quiz.model';
import {Choice} from './choice/models/choice.model';
import {SettingService} from '../../../../services/setting.service';
import {Location} from '@angular/common';
import {User} from '../../../../models/user.model';

@Component({
  selector: 'app-game-setting',
  templateUrl: './game-setting.component.html',
  styleUrls: ['./game-setting.component.scss']
})
export class GameSettingComponent implements OnInit {

  @Input() quizToAdapt!: Quiz;

  choises!: Choice[];

  constructor(private settingService: SettingService, private _location: Location) {
    this.settingService.choices$.subscribe((choises: Choice[]) => {
      this.choises = choises;
    });
}

  ngOnInit(): void {
    this.choises = this.settingService.choices2;
  }

  goBack(): void {
    this._location.back();
  }

}
