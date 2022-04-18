import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {QuizService} from '../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from "../../services/game.service";
import {Game} from "../../models/game.model";

@Component({
  selector: 'app-game-management',
  templateUrl: './game-management.component.html',
  styleUrls: ['./game-management.component.scss']
})
export class GameManagementComponent implements OnInit {


  public quiz: Quiz;
  private nbCorrecte: number = 0;
  private indexQuestion : number = 0;
  private game : Game;



  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router, private gameService : GameService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.gameService.gameSelected$.subscribe((game)=>this.game = game);
  }

  ngOnInit(): void {
      const idUser = this.route.snapshot.paramMap.get('user');
      const idQuiz = this.route.snapshot.paramMap.get('id');
      this.quizService.setSelectedQuiz(idQuiz);
      this.nbCorrecte = 0;

    console.log("passe");
    const obj: any = {
      "quizId": idQuiz,
      "userId": idUser,
      "nbQuestion": this.quiz.questions.length,
      "correct": this.nbCorrecte,
      "currentQuestion": this.indexQuestion
    };

    console.log(obj);

    //add notre instance puis ou add instance fin partie ???
    //this.gameService.setSelectedGame()


  }


    goNextQuestion(juste: boolean): void{
    console.log('On est dans goNext');
    console.log(juste);

    if (juste){
      this.nbCorrecte++;
    }

    }

    finGame(tot: number): void{
    console.log('on recoitttt' + tot);
    this.router.navigate(['/fin/'], {state: {nb: this.nbCorrecte, tot: tot}});


    }



}
