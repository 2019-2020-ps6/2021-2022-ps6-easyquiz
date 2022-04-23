import { Component, OnInit } from '@angular/core';
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
  private nbCorrecte = 0;
  private indexQuestion = 0;
  public user: User;
  private game : Game;
  private obj : any;




  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router, private userService: UserService, private gameService : GameService) {
    this.userService.userSelected$.subscribe((user) => this.user = user);
    this.gameService.gameSelected$.subscribe((game)=>this.game = game);


    this.quizService.quizSelected$.subscribe((quiz) =>{
      this.quiz = quiz;
      console.log('passe');
      const idQuiz = this.route.snapshot.paramMap.get('id');
      const idUser = this.route.snapshot.paramMap.get('user');
      this.obj = {
          "quizId": idQuiz,
          "userId": idUser,
          "nbQuestion": this.quiz.questions.length,
          "correct": this.nbCorrecte,
          'currentQuestion': this.indexQuestion
        };

        //ajouter l'instance

        console.log(this.obj);
        console.log('fin');


    }



    );


  }



  ngOnInit(): void {
    const idUser = this.route.snapshot.paramMap.get('user');
    const idQuiz = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(idQuiz);
    this.userService.setSelectedUser(idUser);


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
    this.router.navigate(['/fin'], {state: {nb: this.nbCorrecte, tot: tot, idUser: this.user.disease, id: this.user.id}});


  }



}
