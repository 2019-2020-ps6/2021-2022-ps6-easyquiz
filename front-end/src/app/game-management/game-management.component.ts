import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {QuizService} from '../../services/quiz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-game-management',
  templateUrl: './game-management.component.html',
  styleUrls: ['./game-management.component.scss']
})
export class GameManagementComponent implements OnInit {


  public quiz: Quiz;
  private nbCorrecte: number;
  public user: User;



  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router, private userService: UserService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.userService.userSelected$.subscribe((user) => this.user = user);
  }

  ngOnInit(): void {
      const idUser = this.route.snapshot.paramMap.get('user');
      const idQuiz = this.route.snapshot.paramMap.get('id');
      this.quizService.setSelectedQuiz(idQuiz);
      this.userService.setSelectedUser(idUser);
      this.nbCorrecte = 0;
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
