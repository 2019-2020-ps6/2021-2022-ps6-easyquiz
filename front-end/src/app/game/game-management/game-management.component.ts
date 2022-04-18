import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {GameService} from "../../../services/game.service";
import {ActivatedRoute, Router} from '@angular/router';
import {Game} from "../../../models/game.model";
import {Question} from "../../../models/question.model";

@Component({
  selector: 'app-game-management',
  templateUrl: './game-management.component.html',
  styleUrls: ['./game-management.component.scss']
})
export class GameManagementComponent implements OnInit{


  public instanceGame: Game;
  public quiz: Quiz;
  private nbCorrecte: number =0;
  private indexQuestion :number =0;


  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router, private gameService: GameService) {

    //Creer mon instance
    this.gameService.gameSelected$.subscribe((game) => this.instanceGame = game);

    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    const idQuiz = this.route.snapshot.paramMap.get('id');
    console.log("notre id quiz vaut " + idQuiz);
    this.quizService.setSelectedQuiz(idQuiz);


    console.log("f1");

    this.inti();


  }

  ngOnInit() {
  }


  async inti(): Promise<void> {

    const idUser = this.route.snapshot.paramMap.get('user');
    const idQuiz = this.route.snapshot.paramMap.get('id');

    console.log("f2");
    const obj: any = {
      "quizId": idQuiz,
      "userId": idUser,
      "nbQuestion": this.quiz.questions.length,
      "correct": 0,
      "currentQuestion": this.indexQuestion
    };

    this.gameService.addGame(obj);
    //this.gameService.setSelectedGame(?);

    if(this.quiz.questions.length===0){this.finGame(0);}


  }


  goNextQuestion(juste: boolean): void {
    console.log('On est dans goNext');
    console.log(juste);

    if (juste) {
      this.nbCorrecte++;
    }
    this.indexQuestion++;

    if(this.quiz.questions.length===this.indexQuestion){
      this.finGame(this.nbCorrecte);
    }

  }

  finGame(tot: number): void {
    console.log('on recoitttt' + tot);
    this.router.navigate(['/fin/'], {state: {nb: this.nbCorrecte, tot: tot}});

  }


}
