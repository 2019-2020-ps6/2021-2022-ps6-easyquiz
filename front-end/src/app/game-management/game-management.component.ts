import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../models/quiz.model";
import {QuizService} from "../../services/quiz.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game-management',
  templateUrl: './game-management.component.html',
  styleUrls: ['./game-management.component.scss']
})
export class GameManagementComponent implements OnInit {

  public quiz: Quiz;


  constructor(private route: ActivatedRoute,private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);

  }

  ngOnInit(): void {
  }

}
