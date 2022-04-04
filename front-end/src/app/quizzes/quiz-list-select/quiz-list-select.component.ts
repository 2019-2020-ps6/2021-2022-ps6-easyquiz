import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router,} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-list-select-list',
  templateUrl: './quiz-list-select.component.html',
  styleUrls: ['./quiz-list-select.component.scss']
})
export class QuizListSelectComponent implements OnInit {

  public quizList: Quiz[] = [];
  public theme: string;

  constructor(private route: ActivatedRoute, private router: Router, public quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit(): void {
    const theme = this.route.snapshot.paramMap.get('theme');
    this.theme = theme;
    this.getQuizzes();
  }

  getQuizzes(): void {
    let i: number;
    for (i = 0; i < this.quizList.length; i++) {
      if (!(this.quizList[i].theme === this.theme)) {
        this.quizList.splice(i, 1);
      }
    }
  }

  themeSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }
}
