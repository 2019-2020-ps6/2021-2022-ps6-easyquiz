import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public themeList: string[] = [];
  public user: User;
  public currentTheme: number;
  public synthe = window.speechSynthesis;
  public gotCataracte = false;
  public isAudioSet = false;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, public quizService: QuizService) {
    this.synthe.cancel();
    this.synthe.resume();
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
      if (this.user.disease === 'Cécité' && !this.isAudioSet) {
        this.setAudioControls();
      } else {
        this.gotCataracte = true;
      }
      this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
        this.quizList = quizzes;
        this.themeList.splice(0, this.themeList.length);
        this.getThemes();
      });
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.setSelectedUser(id);
    this.getThemes();
    this.currentTheme = -1;
  }

  getThemes(): void {
    console.log('récupération des themes');
    let i: number;
    if (this.quizList.length === 0) {
      return;
    }
    this.themeList[0] = '';
    for (i = 0; i < this.quizList.length; i++) {
      if (!(this.themeList[this.themeList.length - 1] === this.quizList[i].theme)) {
        if ((this.user.disease === 'Cataracte' && this.quizList[i].cataracteOk) ||
          (this.user.disease === 'Cécité' && this.quizList[i].ceciteOk)) {
          this.themeList.push(this.quizList[i].theme);
        }
      }
    }
    this.themeList.splice(0, 1);
  }

  setAudioControls(): void {
    let utterThis = new SpeechSynthesisUtterance('Choisissez maintenant un thème. Pour vous déplacer dans les thèmes, utilisez les flèches du haut et du bas. Pour sélectionner un thème, appuyez sur la touche entrée.');
    utterThis.lang = 'fr-FR';
    this.synthe.speak(utterThis);

    document.addEventListener('keydown', (event) => {
      this.synthe.cancel();
      const nomTouche = event.key;
      switch (nomTouche) {
        case 'ArrowUp':
          if (this.currentTheme <= 0) {
            // cannot go upper
          } else {
            this.currentTheme--;
            utterThis = new SpeechSynthesisUtterance(this.themeList[this.currentTheme]);
            utterThis.lang = 'fr-FR';
            this.synthe.speak(utterThis);
          }
          break;
        case 'ArrowDown':
          if (this.currentTheme === this.themeList.length - 1) {
            // cannot go downer
          } else {
            this.currentTheme++;
            utterThis = new SpeechSynthesisUtterance(this.themeList[this.currentTheme]);
            utterThis.lang = 'fr-FR';
            this.synthe.speak(utterThis);
          }
          break;
        case 'Enter':
          if (this.currentTheme >= 0) {
            /*
            utterThis = new SpeechSynthesisUtterance('Vous avez choisi le thème, ' + this.themeList[this.currentTheme]);
            utterThis.lang = 'fr-FR';
            this.synthe.speak(utterThis);
             */
            this.router.navigate(['/' + this.user.id + '/' + this.themeList[this.currentTheme]]);
          }
      }
    }, true);
    this.isAudioSet = true;
  }
}
