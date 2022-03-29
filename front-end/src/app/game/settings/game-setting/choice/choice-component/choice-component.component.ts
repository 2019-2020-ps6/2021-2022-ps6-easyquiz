import {Component, Input, OnInit} from '@angular/core';
import {Choice} from '../models/choice.model';

@Component({
  selector: 'app-choice-component',
  templateUrl: './choice-component.component.html',
  styleUrls: ['./choice-component.component.scss']
})
export class ChoiceComponentComponent implements OnInit {

  @Input() choice!: Choice;

  ngOnInit(): void {
  }

}
