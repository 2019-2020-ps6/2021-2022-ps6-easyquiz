import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';



@Component({
  selector: 'app-profile',
  templateUrl: './configuration-profil.component.html',
  styleUrls: ['./configuration-profil.scss']
})
export class ConfigurationProfilComponent implements OnInit {
  public user: User;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
    this.userService.userSelected$.subscribe((user) => this.user = user);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
  }

  deleteUser(): void {
    this.userService.deleteUser(this.user);
    this.router.navigate(['/']);
  }

}
