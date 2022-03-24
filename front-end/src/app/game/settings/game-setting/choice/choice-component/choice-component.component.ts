import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choice-component',
  templateUrl: './choice-component.component.html',
  styleUrls: ['./choice-component.component.scss']
})
export class ChoiceComponentComponent implements OnInit {
  urlImage: string;

  constructor() { }

  ngOnInit(): void {
    this.urlImage = 'https://images.carforyou.ch/2021/04/03/13/21/26/1-audi-a1-14-tfsi-attraction-1782369-BUhgTpaU3Xz9.jpg?auto=compress%2Cformat&width=650';
  }

}
