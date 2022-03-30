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
import {GameManagementComponent} from "./game-management/game-management.component";

const routes: Routes = [
  {path: 'user-list', component: UserListComponent},
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'user-create', component: UserCreateComponent},
  {path: '', redirectTo: '/user-list', pathMatch: 'full'},
  {path: 'game', component: GameComponent},
  {path: 'game/zoom', component: ZoomPictureComponent},
  {path: 'game/:id', component: GameManagementComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'settings', component: GameSettingComponent},
  {path: ':id/theme', component: ThemeListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
