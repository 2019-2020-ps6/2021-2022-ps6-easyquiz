import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router,} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-quiz-list-select-list',
  templateUrl: './quiz-list-select.component.html',
  styleUrls: ['./quiz-list-select.component.scss']
})
export class QuizListSelectComponent implements OnInit {

  public quizList: Quiz[] = [];
  public quizThemeList: Quiz[] = [];
  public theme: string;
  public user: User;
  public currentQuiz: number;
  public synthe = window.speechSynthesis;

  constructor(private route: ActivatedRoute, private router: Router, public quizService: QuizService, public userService: UserService) {
    this.synthe.cancel();
    this.synthe.resume();
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
      console.log('quizzes subscribed');
    });
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      console.log('user subscribed');
      this.setAudioControls();
      this.getQuizzes();
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
    const theme = this.route.snapshot.paramMap.get('theme');
    this.theme = theme;
    console.log('theme retrieved from url');
    this.currentQuiz = -1;
  }

  getQuizzes(): void {
    console.log('getQuizzes begining');
    this.quizList.forEach(quiz => {
      if (quiz.theme === this.theme && ((this.user.disease === 'Cataracte' && quiz.cataracteOk) ||
        (this.user.disease === 'Cécité' && quiz.ceciteOk))) {
        this.quizThemeList.push(quiz);
      }
    });
  }

  setAudioControls(): void {
    let utterThis = new SpeechSynthesisUtterance('Choisissez maintenant un quiz.');
    utterThis.lang = 'fr-FR';
    this.synthe.speak(utterThis);

    document.addEventListener('keydown', (event) => {
      this.synthe.cancel();
      const nomTouche = event.key;
      switch (nomTouche) {
        case 'ArrowUp':
          if (this.currentQuiz <= 0) {
            // cannot go upper
          } else {
            this.currentQuiz--;
            utterThis = new SpeechSynthesisUtterance(this.quizThemeList[this.currentQuiz].name);
            utterThis.lang = 'fr-FR';
            this.synthe.speak(utterThis);
          }
          break;
        case 'ArrowDown':
          if (this.currentQuiz === this.quizThemeList.length - 1) {
            // cannot go downer
          } else {
            this.currentQuiz++;
            utterThis = new SpeechSynthesisUtterance(this.quizThemeList[this.currentQuiz].name);
            utterThis.lang = 'fr-FR';
            this.synthe.speak(utterThis);
          }
          break;
        case 'Enter':
          if (this.currentQuiz >= 0) {
            utterThis = new SpeechSynthesisUtterance('Vous avez choisi le quiz, ' + this.quizThemeList[this.currentQuiz].name);
            utterThis.lang = 'fr-FR';
            this.synthe.speak(utterThis);
            this.router.navigate(['/game/' + this.user.id + '/' + this.quizThemeList[this.currentQuiz].id]);
          }
      }
    }, true);
  }
}
