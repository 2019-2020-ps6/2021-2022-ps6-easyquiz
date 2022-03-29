import {Component, Input, OnInit} from '@angular/core';
import {Choice} from '../models/choice.model';
import {SettingService} from '../../../../../../services/setting.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-choice-component',
  templateUrl: './choice-component.component.html',
  styleUrls: ['./choice-component.component.scss']
})
export class ChoiceComponentComponent implements OnInit {

  @Input() choice!: Choice;

  constructor(private settingService: SettingService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onChoisirClick(): void {
    this.settingService.choiceSelected = this.choice;
    this.choice.buttonColor = 'red';
    this.router.navigate(['/game/']);
  }

}
