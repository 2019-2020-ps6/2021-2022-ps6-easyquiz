import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {QuizComponent} from './quizzes/quiz/quiz.component';
import {HeaderComponent} from './header/header.component';
import {QuizFormComponent} from './quizzes/quiz-form/quiz-form.component';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {AppRoutingModule} from './app.routing.module';
import {QuestionListComponent} from './questions/question-list/question-list.component';
import {QuestionFormComponent} from './questions/question-form/question-form.component';
import {QuestionComponent} from './questions/question/question.component';
import {UserComponent} from './users/user/user.component';
import {UserFormComponent} from './users/user-form/user-form.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {GameSettingComponent} from './game/settings/game-setting/game-setting.component';
import {UserCreateComponent} from './users/user-create/user-create.component';
import {GameComponent} from './game/game.component';
import {ChoiceComponentComponent} from './game/settings/game-setting/choice/choice-component/choice-component.component';
import {AnswerButtonComponent} from './game/answer-button/answer-button.component';
import {ProfileComponent} from './userhome/profile/profile.component';
import {ZoomPictureComponent} from './game/zoom-picture/zoom-picture.component';
import {ThemeComponent} from './themes/theme/theme.component';
import {ThemeListComponent} from './themes/theme-list/theme-list.component';
import { GameManagementComponent } from './game-management/game-management.component';
import {ConfigurationProfilComponent} from './userhome/Configuration-Profil/configuration-profil';
import {GameSpeechComponent} from './game-speech/game-speech.component';
import {Configuration} from 'jasmine-spec-reporter/built/configuration';


@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    EditQuizComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionComponent,
    UserComponent,
    UserFormComponent,
    UserListComponent,
    GameSettingComponent,
    UserCreateComponent,
    GameComponent,
    ChoiceComponentComponent,
    AnswerButtonComponent,
    ProfileComponent,
    ZoomPictureComponent,
    ThemeComponent,
    ThemeListComponent,
    GameManagementComponent,
    ConfigurationProfilComponent,
    GameSpeechComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
