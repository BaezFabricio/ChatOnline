import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/Firebase-Code-Error';


@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

  CodeErrors(code: string) {
    switch (code) {
      //correo ya existe
      case FirebaseCodeErrorEnum.emailAlrreadyInUse:
        return 'El usuario ya existe';

      //contraseña debil
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es debil';

      //correo invalido
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Correo Invalido';

      //Contraseña Incorrecta
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Contraseña Incorrecta';

        //usuario no existe
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'El usuario no existe';

      case FirebaseCodeErrorEnum.cancelledPopup:
        return 'Cancelo el logueo';
      
      case FirebaseCodeErrorEnum.popuClosed:
        return 'Cerro el logueo';

      case FirebaseCodeErrorEnum.ExistCountDiferentCredencial:
        return 'Usted ya se logueo con otra credencial';
  
      default:
        return 'Error Desconocido';

    }
  }


}
