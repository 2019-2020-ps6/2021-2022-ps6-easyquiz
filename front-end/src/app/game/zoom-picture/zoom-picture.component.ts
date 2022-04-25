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
  public data: any;

  constructor(private _location: Location, private router: Router) {
    this.urlPhoto = this.router.getCurrentNavigation().extras.state.link;
    this.pageBackground = this.router.getCurrentNavigation().extras.state.bgColor;
    this.data = this.router.getCurrentNavigation().extras.state.data;


  }

  ngOnInit(): void {
    console.log("passse");
  }

  backClicked() {
    this.router.navigate(['/game/cataracte'], {state: {data : this.data}});
  }

}
