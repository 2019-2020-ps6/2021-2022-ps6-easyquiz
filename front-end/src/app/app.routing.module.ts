import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {GameComponent} from './game/game.component';
import {UserCreateComponent} from './users/user-create/user-create.component';
import {GameSettingComponent} from './game/settings/game-setting/game-setting.component';
import {ProfileComponent} from './userhome/profile/profile.component';
import {ZoomPictureComponent} from './game/zoom-picture/zoom-picture.component';
import {ThemeListComponent} from './themes/theme-list/theme-list.component';
import {GameManagementComponent} from './game-management/game-management.component';
import {ConfigurationProfilComponent} from './userhome/Configuration-Profil/configuration-profil';
import {GameSpeechComponent} from './game-speech/game-speech.component';
import {Configuration} from 'jasmine-spec-reporter/built/configuration';
// @ts-ignore
import {QuizListSelectComponent} from './quizzes/quiz-list-select/quiz-list-select.component';
import {FinPartieComponent} from './game/fin-partie/fin-partie.component';
import {StatistiqueComponent} from "./statistique/statistique.component";

const routes: Routes = [
  {path: 'user-list', component: UserListComponent},
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'user-create', component: UserCreateComponent},
  {path: '', redirectTo: '/user-list', pathMatch: 'full'},
  {path: 'game/cecite', component : GameSpeechComponent},
  {path: 'game/cataracte', component: GameComponent},
  {path: 'game/zoom', component: ZoomPictureComponent},
  {path: 'game/:user/:id', component: GameManagementComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'stat', component : StatistiqueComponent},
  {path: 'settings', component: GameSettingComponent},
  {path: ':id/theme', component: ThemeListComponent},
  {path: ':id/configuration', component : ConfigurationProfilComponent},
  {path: ':id/:theme', component : QuizListSelectComponent},
  {path: ':id/configuration', component : ConfigurationProfilComponent},
  {path: 'fin', component : FinPartieComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
