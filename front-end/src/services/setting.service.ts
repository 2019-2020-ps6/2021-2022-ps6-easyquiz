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
      pageBackGroung: '#6c6464',
      questionBackGround: '#212bc4'
    },
    {
      Id: 2,
      urlImage: 'https://www.pyreweb.com/files/medias/images/Pages/creation_logiciel/ecrans-soft.png',
      buttonColor: '#fca14e',
      pageBackGroung: '#45656c',
      questionBackGround: '#212bc4'
    },
    {
      Id: 3,
      urlImage: 'https://www.meilleure-innovation.com/wp-content/uploads/2021/02/logiciel-definition.jpg',
      buttonColor: '#ce0f0f',
      pageBackGroung: '#ffffff',
      questionBackGround: '#212bc4'
    }
  ];

}
