import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../models/quiz.model";
import {QuizService} from "../../services/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";
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


  constructor(private route: ActivatedRoute,private quizService: QuizService, private router: Router) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit(): void {
      const idUser = this.route.snapshot.paramMap.get('user');
      const idQuiz = this.route.snapshot.paramMap.get('id');
      this.quizService.setSelectedQuiz(idQuiz);
      this.nbCorrecte=0;
    }


    goNextQuestion(juste : boolean): void{
    console.log("On est dans goNext")
      console.log(juste);

      if(juste){
        this.nbCorrecte++;
      }

    }

    finGame(tot: number): void{
    console.log("on recoitttt" + tot);
      this.router.navigate(['/fin/'],{state: {nb: this.nbCorrecte, tot: tot}});


    }



}
