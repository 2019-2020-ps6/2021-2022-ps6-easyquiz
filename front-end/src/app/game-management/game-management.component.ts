import {Component, OnInit} from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {QuizService} from '../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {GameService} from "../../services/game.service";
import {Game} from '../../models/game.model';
import {isBooleanLiteralLike} from "codelyzer/util/utils";

@Component({
  selector: 'app-game-management',
  templateUrl: './game-management.component.html',
  styleUrls: ['./game-management.component.scss']
})
export class GameManagementComponent implements OnInit {

  public quiz: Quiz;
  public user: User;
  private data: any;
  private idQuiz;
  private idUser;


  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router, private userService: UserService, private gameService: GameService) {

    this.userService.userSelected$.subscribe((user) => {

      console.log("mate");
      this.user = user
      this.quizService.quizSelected$.subscribe( (quiz) => {
      this.quiz = quiz;

        console.log("Notre user id est "+user.id);

        this.data = {
        "quizId": this.idQuiz,
        "userId": this.idUser,
        "questions": this.quiz.questions,
        "currentQuestion": 0,
        "correct": 0,
      };

      console.log("On a crée cet objet"); console.log(this.data); console.log("notre patient a la malaide" + user.disease);

      if(user.disease=="Cécité"){
        console.log("AVEUGLE");
        this.router.navigate(['/game/cecite'], {state: {data : this.data}});

      }
      if(user.disease=="Cataracte"){
        this.router.navigate(['/game/cataracte'], {state: {data : this.data}});
        console.log("CATA");
      }

    });
    });

  }

  ngOnInit(): void {

    this.idQuiz = this.route.snapshot.paramMap.get('id');
    this.idUser = this.route.snapshot.paramMap.get('user');

    this.userService.setSelectedUser(this.idUser);
    this.quizService.setSelectedQuiz(this.idQuiz);
  }





}
