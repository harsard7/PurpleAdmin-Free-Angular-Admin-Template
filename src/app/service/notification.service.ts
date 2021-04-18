import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {
  }

  showSuccess(message, title) {
    this.playSound('Success 1.m4a');
    this.toastr.success(message, title);
  }

  showError(error,title?) {
    this.playSound('Error 1.m4a');
    if(error== null || error.error==null){
      this.toastr.error('', title);
    }else{
      this.errorHandle(error);
    }
  }

  showInfo(message, title) {
    this.toastr.info(message, title)
  }

  showWarning(message, title) {
    this.toastr.warning(message, title)
  }
  errorHandle(error){
      if (error.error instanceof ErrorEvent) {
        // client-side error
        var err = ` Error Code 2: ${error.status}\nMessage: ${error.error.message}`;
        this.toastr.error(err, "Failed : User Side Error");
        // this.showError(err, "Client Side Error");
        // console.log("Error 1:-> "+JSON.stringify(error));
      } else {
        // server-side error
        // var err = `Error Code 2: ${error.status}\nMessage: ${error.message}`;
        if(error.message!=null){
           var  err = `Error Code : ${error.status}\nMessage: ${error.error.message}`;
          this.toastr.error(err, "Failed : Server side Error");

        }else {
          this.toastr.error('Unknown error', "Failed : Server side Error");
        }
    }
  }

  playSound(sound) {
    sound = "../assets/sounds/" + sound;
    sound && ( new Audio(sound) ).play()
  }
}
