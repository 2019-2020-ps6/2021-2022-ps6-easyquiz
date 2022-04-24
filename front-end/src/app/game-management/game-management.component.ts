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
  private obj: any;
  private idQuiz;
  private idUser;


  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router, private userService: UserService, private gameService: GameService) {

    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");

    this.idQuiz = this.route.snapshot.paramMap.get('id');
    this.idUser = this.route.snapshot.paramMap.get('user');

    this.userService.userSelected$.subscribe((user) => this.user = user);
    this.quizService.quizSelected$.subscribe( (quiz) => {

      this.quiz = quiz;
      console.log("a");

      this.obj = {
        "quizId": this.idQuiz,
        "userId": this.idUser,
        "nbQuestion": this.quiz.questions.length,
        "correct": 0,
        "currentQuestion": 0
      };
      console.log("ON VA AJOUTER UN TRUC");
      this.gameService.addGame(this.obj);

      console.log('eh ho');
      console.log(this.obj);

    });

  }

  ngOnInit(): void {
    this.quizService.setSelectedQuiz(this.idQuiz);
    this.userService.setSelectedUser(this.idUser);
  }



}
