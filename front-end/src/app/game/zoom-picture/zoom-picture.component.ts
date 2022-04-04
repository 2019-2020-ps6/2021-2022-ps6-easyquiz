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

  constructor(private _location: Location, private router: Router) { }

  ngOnInit(): void {
    this.urlPhoto = this.router.getCurrentNavigation().extras.state.link;

  }

  backClicked() {
    this._location.back();
  }

}
