import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  @Input()
  theme: string;

  @Output()
  themeSelected: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() {
  }

  ngOnInit(): void {
  }
}
