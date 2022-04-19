import {Component, Input, OnInit} from '@angular/core';
import {Choice} from '../models/choice.model';
import {SettingService} from '../../../../../../services/setting.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-choice-component',
  templateUrl: './choice-component.component.html',
  styleUrls: ['./choice-component.component.scss']
})
export class ChoiceComponentComponent implements OnInit {

  @Input() choice!: Choice;

  constructor(private settingService: SettingService, private router: Router, private _location: Location) {
  }

  ngOnInit(): void {
  }

  onChoisirClick(): void {
    this.settingService.choiceSelected = this.choice;
    this.choice.buttonColor = 'red';
    this._location.back();
  }

}
