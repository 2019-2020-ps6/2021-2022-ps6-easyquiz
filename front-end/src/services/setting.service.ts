import {Injectable} from '@angular/core';
import {Choice} from '../app/game/settings/game-setting/choice/models/choice.model';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject} from 'rxjs';
import {serverUrl} from '../configs/server.config';


@Injectable({
  providedIn: 'root'
})

export class SettingService{
  /*
   The list of choices.
   */
  choices2: Choice[] = [];

  /*
   Observable which contains the list of the choices.
   */
  public choices$: BehaviorSubject<Choice[]>
    = new BehaviorSubject([]);

  private userUrl = serverUrl + '/settings';

  constructor(private http: HttpClient) {
      this.retrieveSettings();
  }

  /*
  / Les configurations de base stockés en dur dans le cas où le serveur ne réponderai pas
  */
  choises: Choice[] = [
    {
      Id: 1,
      urlImage: 'https://www.meilleure-innovation.com/wp-content/uploads/2021/02/logiciel-definition.jpg',
      buttonColor: '#fca14e',
      pageBackGround: 'rgba(148, 239, 156, 0.65)',
      questionBackGround: '#146385'
    },
    {
      Id: 1,
      urlImage: 'https://www.meilleure-innovation.com/wp-content/uploads/2021/02/logiciel-definition.jpg',
      buttonColor: '#fca14e',
      pageBackGround: '#56a934',
      questionBackGround: '#6696ff'
    },
    {
      Id: 2,
      urlImage: 'https://www.pyreweb.com/files/medias/images/Pages/creation_logiciel/ecrans-soft.png',
      buttonColor: '#fca14e',
      pageBackGround: '#45656c',
      questionBackGround: '#b1be60'
    },
    {
      Id: 3,
      urlImage: 'https://www.meilleure-innovation.com/wp-content/uploads/2021/02/logiciel-definition.jpg',
      buttonColor: '#fca14e',
      pageBackGround: '#ffffff',
      questionBackGround: '#797777'
    }
  ];

  // Choix de base
  choiceSelected: Choice = this.choises[0];


  retrieveSettings(): void {
    this.http.get<Choice[]>(this.userUrl).subscribe((choiceList) => {
      this.choices2 = choiceList;
      this.choices$.next(this.choices2);
    });
  }

  getSelectedChoice(): Choice {
    return this.choiceSelected;
  }

}
