import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-fin-partie',
  templateUrl: './fin-partie.component.html',
  styleUrls: ['./fin-partie.component.scss']
})
export class FinPartieComponent implements OnInit {

  public nbGoodAnswer: number;
  public totalAnswer: number;
  public user: User;
  public iduser: string;

  // tslint:disable-next-line:variable-name
  constructor(private _location: Location, private router: Router, private route: ActivatedRoute, private userService: UserService) {
    this.nbGoodAnswer = this.router.getCurrentNavigation().extras.state.nb;
    this.totalAnswer = this.router.getCurrentNavigation().extras.state.tot;
    this.iduser = this.router.getCurrentNavigation().extras.state.idUser;

    this.userService.userSelected$.subscribe((user) => this.user = user);

    if (this.iduser !== 'Cataracte'){
      const synth = window.speechSynthesis;
      const utterThise = new SpeechSynthesisUtterance('Vous avez' + this.nbGoodAnswer + 'bonnes réponses sur' + this.totalAnswer + '.');
      utterThise.lang = 'fr-FR';
      synth.speak(utterThise);

    }

  }




  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
  }
}
