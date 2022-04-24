import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Game } from '../models/game.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  /*
   The list of game.
   */
  private game: Game;

  /*
   Observable which contains the list of the games.
   */
  //public game$: BehaviorSubject<Game>
   // = new BehaviorSubject(null);

  public game$: Subject<Game> = new Subject();

  private gameUrl = serverUrl + '/game';

  private httpOptions = httpOptionsBase;

  private enCours: boolean= false;

  constructor(private http: HttpClient) {
    //this.retrieveGames();

  }

  retrieveGames(): void {
    this.http.get<Game>(this.gameUrl).subscribe((game) => {
      this.game = game;
      this.game$.next(this.game);
    });
  }


  addGame(game: Game): void {
    /**
    if(this.enCours){console.log("on return car en cours");return;}
    else{
      console.log("PAS en cours");
    }
     **/
    console.log("PASSE ADD SERVICE");
    this.http.post<Game>(this.gameUrl, game, this.httpOptions).subscribe((game) => {
      this.enCours=true;
        this.game=game;
        this.game$.next(game);
        console.log("FIN ADD SERVICE, on add "+this.game.id);
      }
    );
  }

  modify(juste:boolean){

    console.log("juste vaut"+juste+"AAAAAAAAAAAAAA");
    console.log("thread2");

    if(juste){this.game.correct++; console.log("CORRECT VUAAT"+this.game.correct);}

    this.game.currentQuestion++;
    this.game$.next(this.game);


    console.log("fin thread2");
    console.log(this.game);

    if(this.game.currentQuestion===this.game.nbQuestion){this.enCours=false;}
    console.log("en cours vaut"+this.enCours);

  }



  setSelectedGame(gameId: string): void {
    const urlWithId = this.gameUrl + '/' + gameId;
    this.http.get<Game>(urlWithId).subscribe((game) => {
      this.game$.next(game);
    });
    console.log("FIN SET GAME");
  }

  deleteGame(game: Game): void {
    const urlWithId = this.gameUrl + '/' + game.id;
    this.http.delete<Game>(urlWithId, this.httpOptions).subscribe(() => this.retrieveGames());
  }

}
