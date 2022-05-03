import { Component, OnInit } from '@angular/core';

import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[] = [];

  constructor(private userService: UserService) {
    window.speechSynthesis.cancel();
    this.userService.users$.subscribe((users: User[]) => {
      this.userList = users;
      this.userList.sort((u1, u2) => {
        if (u1.firstName > u2.firstName) {
          return 1;
        }
        if (u1.firstName < u2.firstName) {
          return -1;
        }
        return 0;
      });
    });
  }

  ngOnInit(): void {
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user);
  }
}
