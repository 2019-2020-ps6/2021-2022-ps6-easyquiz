import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-zoom-picture',
  templateUrl: './zoom-picture.component.html',
  styleUrls: ['./zoom-picture.component.scss']
})
export class ZoomPictureComponent implements OnInit {

  public urlPhoto: string;
  public pageBackground: string;

  constructor(private _location: Location, private router: Router) {
    this.urlPhoto = this.router.getCurrentNavigation().extras.state.link;
    this.pageBackground = this.router.getCurrentNavigation().extras.state.bgColor;

  }

  ngOnInit(): void {
    console.log("passse");
  }

  backClicked() {
    this._location.back();
  }

}
