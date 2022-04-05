import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, } from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-list-select-list',
  templateUrl: './quiz-list-select.component.html',
  styleUrls: ['./quiz-list-select.component.scss']
})
export class QuizListSelectComponent implements OnInit {

  public quizList: Quiz[] = [];
  public quizThemeList: Quiz[] = [];
  public theme: string;
  public userId: string;

  constructor(private route: ActivatedRoute, private router: Router, public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit(): void {
    const theme = this.route.snapshot.paramMap.get('theme');
    this.theme = theme;
    const userId = this.route.snapshot.paramMap.get('id');
    this.userId = userId;
    this.getQuizzes();
  }

  getQuizzes(): void {
    this.quizList.forEach( quiz => {
      if (quiz.theme === this.theme) {
      this.quizThemeList.push(quiz);
      }
    } );

    /*
    this.quizList.forEach( quiz => {
      this.quizListString.set(quiz.id, quiz.name);
    } );

    let i: number;
    this.quizListString[0] = this.quizList[0].name;
    for (i = 1; i < this.quizList.length; i++) {
      if (this.quizList[i].theme === this.theme) {
        this.quizListString.push(this.quizList[i].name);
      }
    }

    let i: number;
    for (i = 0; i < this.quizList.length; i++) {
      if (!(this.quizList[i].theme === this.theme)) {
        this.quizList.splice(i, 1);
      }
    }*/

  }

  themeSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }
}
