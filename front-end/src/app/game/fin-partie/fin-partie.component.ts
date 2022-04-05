import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fin-partie',
  templateUrl: './fin-partie.component.html',
  styleUrls: ['./fin-partie.component.scss']
})
export class FinPartieComponent implements OnInit {

   public nbGoodAnswer: number;
   public totalAnswer : number;

  constructor(private _location: Location, private router: Router) {
    this.nbGoodAnswer = this.router.getCurrentNavigation().extras.state.nb;
    this.totalAnswer = this.router.getCurrentNavigation().extras.state.tot;

  }

  ngOnInit(): void {
  }

}
