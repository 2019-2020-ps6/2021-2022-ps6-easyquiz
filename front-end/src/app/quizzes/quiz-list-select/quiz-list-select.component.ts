import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, } from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-quiz-list-select-list',
  templateUrl: './quiz-list-select.component.html',
  styleUrls: ['./quiz-list-select.component.scss']
})
export class QuizListSelectComponent implements OnInit {

  public quizList: Quiz[] = [];
  public quizThemeList: Quiz[] = [];
  public theme: string;
  public user: User;

  constructor(private route: ActivatedRoute, private router: Router, public quizService: QuizService, public userService: UserService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
      console.log('quizzes subscribed');
    });
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      console.log('user subscribed');
      this.getQuizzes();
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
    const theme = this.route.snapshot.paramMap.get('theme');
    this.theme = theme;
    console.log('theme retrieved from url');
  }

  getQuizzes(): void {
    console.log('getQuizzes begining');
    this.quizList.forEach(quiz => {
      if (quiz.theme === this.theme && ((this.user.disease === 'Cataracte' && quiz.cataracteOk) ||
        (this.user.disease === 'Cécité' && quiz.ceciteOk))) {
        this.quizThemeList.push(quiz);
      }
    });
  }
}
