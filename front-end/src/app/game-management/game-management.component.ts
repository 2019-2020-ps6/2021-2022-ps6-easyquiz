import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../models/quiz.model";
import {QuizService} from "../../services/quiz.service";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../models/question.model";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-game-management',
  templateUrl: './game-management.component.html',
  styleUrls: ['./game-management.component.scss']
})
export class GameManagementComponent implements OnInit {


  public quiz: Quiz;
  private nbCorrecte : number;


  constructor(private route: ActivatedRoute,private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit(): void {
      const idUser = this.route.snapshot.paramMap.get('user');
      const idQuiz = this.route.snapshot.paramMap.get('id');
      this.quizService.setSelectedQuiz(idQuiz);
      console.log("Nous on a quiz "+this.quiz);
      this.nbCorrecte=0;
    }


    goNextQuestion(juste : boolean): void{
    console.log("On est dans goNext")

      if(juste){
        this.nbCorrecte++;
      }


      if(this.quiz.questions.length==0){
        console.log("fin");
        //navaiguer fin
      }




    }

}
