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

  constructor(private _location: Location, private router: Router, private route: ActivatedRoute, private userService: UserService) {
    this.nbGoodAnswer = this.router.getCurrentNavigation().extras.state.nb;
    this.totalAnswer = this.router.getCurrentNavigation().extras.state.tot;
    this.userService.userSelected$.subscribe((user) =>{
      this.user = user;
      if (this.user.disease === 'Cécité') {
        console.log("passe");
        const synth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance(document.getElementById('retourr').textContent);
        utterThis.lang = 'fr-FR';
        utterThis.rate = 1;
        synth.speak(utterThis);
      }



    } );




  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
  }

}
