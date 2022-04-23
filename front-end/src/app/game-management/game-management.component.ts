import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {QuizService} from '../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {GameService} from "../../services/game.service";
import {Game} from '../../models/game.model';

@Component({
  selector: 'app-game-management',
  templateUrl: './game-management.component.html',
  styleUrls: ['./game-management.component.scss']
})
export class GameManagementComponent implements OnInit {

  public quiz: Quiz;
  public user: User;
  private game: Game;
  private obj: any;
  private idQuiz;
  private idUser;


  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router, private userService: UserService, private gameService: GameService) {

    this.idQuiz = this.route.snapshot.paramMap.get('id');
    this.idUser = this.route.snapshot.paramMap.get('user');

    this.userService.userSelected$.subscribe((user) => this.user = user);
    this.gameService.gameSelected$.subscribe((game) => this.game = game);

    this.quizService.quizSelected$.subscribe((quiz) => {
        this.quiz = quiz;
        console.log('passe');

        //Enlever currentQuestion de l'instance
        this.obj = {
          "quizId": this.idQuiz,
          "userId": this.idUser,
          "nbQuestion": this.quiz.questions.length,
          "correct": 0,
        };

        //////////////////////////////////////////////////////////////
        this.gameService.addGame(this.obj);
        console.log("on a add");




        //ajouter l'instance
        console.log('eh ho');
        console.log(this.obj);


      }
    );


  }


  ngOnInit(): void {

    this.quizService.setSelectedQuiz(this.idQuiz);
    this.userService.setSelectedUser(this.idUser);


    //add notre instance puis ou add instance fin partie ???
    //this.gameService.setSelectedGame()

  }


  goNextQuestion(juste: boolean): void {
    console.log('On est dans goNext');

    if (juste) {
      this.obj.correct++;
    }
    this.obj.currentQuestion++;

    console.log("nbCorrecte vaut" + this.obj.correct+" et cur question "+this.obj.currentQuestion);
    console.log(this.obj);

  }

  finGame(tot: number): void {
    console.log("correct vaut ici "+this.obj.correct);
    this.router.navigate(['/fin/'], {state: {nb: this.obj.correct, tot: tot}});


  }


}
