import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { EditQuizComponent } from './quizzes/edit-quiz/edit-quiz.component';
import { UserListComponent } from './users/user-list/user-list.component';
import {ChoiceComponentComponent} from './game/settings/game-setting/choice/choice-component/choice-component.component';
import {GameComponent} from './game/game.component';
import {UserCreateComponent} from './users/user-create/user-create.component';
import {GameSettingComponent} from './game/settings/game-setting/game-setting.component';

const routes: Routes = [
    {path: 'user-list', component: UserListComponent},
    {path: 'quiz-list', component: QuizListComponent},
    {path: 'edit-quiz/:id', component: EditQuizComponent},
    {path: 'user-create', component: UserCreateComponent},
    {path: '', redirectTo: '/user-list', pathMatch: 'full' },
    {path: 'game', component: GameComponent},
    { path: 'settings', component: GameSettingComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
