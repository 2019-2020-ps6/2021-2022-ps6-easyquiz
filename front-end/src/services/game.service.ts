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
   The list of user.
   */
  private games: Game[] = [];

  /*
   Observable which contains the list of the user.
   */
  public games$: BehaviorSubject<Game[]>
    = new BehaviorSubject([]);

  public gameSelected$: Subject<Game> = new Subject();

  private gameUrl = serverUrl + '/game';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveGames();
  }

  retrieveGames(): void {
    this.http.get<Game[]>(this.gameUrl).subscribe((gameList) => {
      this.games = gameList;
      this.games$.next(this.games);
    });
  }

  addGame(game: Game): void {
    this.http.post<Game>(this.gameUrl, game, this.httpOptions).subscribe(() => this.retrieveGames());
  }

  setSelectedGame(gameId: string): void {
    const urlWithId = this.gameUrl + '/' + gameId;
    this.http.get<Game>(urlWithId).subscribe((game) => {
      this.gameSelected$.next(game);
    });
  }

  deleteUser(game: Game): void {
    const urlWithId = this.gameUrl + '/' + game.id;
    this.http.delete<Game>(urlWithId, this.httpOptions).subscribe(() => this.retrieveGames());
  }
}
