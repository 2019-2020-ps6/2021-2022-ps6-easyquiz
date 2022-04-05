import {Injectable} from '@angular/core';
import {Choice} from '../app/game/settings/game-setting/choice/models/choice.model';


@Injectable({
  providedIn: 'root'
})

export class SettingService{

  choises: Choice[] = [
    {
      Id: 1,
      urlImage: 'https://www.meilleure-innovation.com/wp-content/uploads/2021/02/logiciel-definition.jpg',
      buttonColor: '#fca14e',
      pageBackGroung: 'rgba(148, 239, 156, 0.65)',
      questionBackGround: '#146385'
    },
    {
      Id: 2,
      urlImage: 'https://www.pyreweb.com/files/medias/images/Pages/creation_logiciel/ecrans-soft.png',
      buttonColor: '#fca14e',
      pageBackGroung: '#45656c',
      questionBackGround: '#b1be60'
    },
    {
      Id: 3,
      urlImage: 'https://www.meilleure-innovation.com/wp-content/uploads/2021/02/logiciel-definition.jpg',
      buttonColor: '#fca14e',
      pageBackGroung: '#ffffff',
      questionBackGround: '#797777'
    }
  ];

  choiceSelected: Choice = this.choises[0];

  getSelectedChoice(): Choice {
    return this.choiceSelected;
  }

}
