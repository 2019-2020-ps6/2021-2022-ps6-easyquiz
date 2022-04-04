import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {UserService} from "../../../services/user.service";
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public themeList: string[] = [];
  public user: User;

  constructor(private route: ActivatedRoute, private userService: UserService, public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
    this.userService.userSelected$.subscribe((user) => this.user = user);
  }


  ngOnInit(): void {
    this.getThemes();
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
  }

  getThemes(): void {
    let i: number;
    this.themeList[0] = this.quizList[0].theme;
    for (i = 1; i < this.quizList.length; i++){
        this.themeList.push(this.quizList[i].theme);
    }
  }

  themeSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }
}
