import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {UserService} from '../../../services/user.service';
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
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
        this.quizList = quizzes;
        this.themeList.splice(0, this.themeList.length);
        this.getThemes();
      });
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
    this.getThemes();
  }

  getThemes(): void {
    console.log('récupération des themes');
    let i: number;
    this.themeList[0] = '';
    for (i = 0; i < this.quizList.length; i++) {
      console.log('for');
      if (!(this.themeList[this.themeList.length - 1] === this.quizList[i].theme)){
        console.log('trouble:' + this.user.disease);
        console.log('theme:' + this.quizList[i].theme);
        if ((this.user.disease === 'Cataracte' && this.quizList[i].cataracteOk) ||
          (this.user.disease === 'Cécité' && this.quizList[i].ceciteOk)) {
          this.themeList.push(this.quizList[i].theme);
        }
      }
    }
  }

  themeSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }
}
