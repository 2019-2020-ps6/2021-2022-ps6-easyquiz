import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {Quiz} from '../models/quiz.model';
import {QUIZ_LIST} from '../mocks/quiz-list.mock';
import {Question} from '../models/question.model';
import {serverUrl, httpOptionsBase} from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of quiz.
   The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = QUIZ_LIST;


  /*
   Observable which contains the list of the quiz.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]>
    = new BehaviorSubject(this.quizzes);

  public quizSelected$: Subject<Quiz> = new Subject();

  private quizUrl = serverUrl + '/quizzes';
  private questionsPath = 'questions';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveQuizzes();
  }

  retrieveQuizzes(): void {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  addQuiz(quiz: Quiz): void {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  setSelectedQuiz(quizId: string): void {
    console.log('DANS SET SELECTED QUIZ AVEC ID ' + quizId);
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
      console.log(quiz.questions[0]);
    });
  }


  deleteQuiz(quiz: Quiz): void {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  addQuestion(quiz: Quiz, question: Question): void {
    console.log('on voit l\'ulr' + question.urlIMG);
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  getThemes(): string[] {
    const res: string[] = [];
    for (const quiz of this.quizzes) {
      res.push(quiz.theme);
    }
    res.sort((s1, s2) => {
      if (s1 > s2) {
        return 1;
      }
      if (s1 < s2) {
        return -1;
      }
    });
    console.log('size before filter: ' + res.length);
    let i = 1;
    while (i < res.length) {
      if (res[i - 1] === res[i]) {
        res.splice(i, 1);
      } else {
        i++;
      }
    }
    console.log('size after filter: ' + res.length);
    /*res.filter((elem, index, self) => {
      return !index || elem !== self[index - 1];
    });*/
    return res;
  }

  /*
  Note: The functions below don't interact with the server. It's an example of implementation for the exercice 10.
  addQuestion(quiz: Quiz, question: Question) {
    quiz.questions.push(question);
    const index = this.quizzes.findIndex((q: Quiz) => q.id === quiz.id);
    if (index) {
      this.updateQuizzes(quiz, index);
    }
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const index = quiz.questions.findIndex((q) => q.label === question.label);
    if (index !== -1) {
      quiz.questions.splice(index, 1)
      this.updateQuizzes(quiz, index);
    }
  }

  private updateQuizzes(quiz: Quiz, index: number) {
    this.quizzes[index] = quiz;
    this.quizzes$.next(this.quizzes);
  }
  */
}
