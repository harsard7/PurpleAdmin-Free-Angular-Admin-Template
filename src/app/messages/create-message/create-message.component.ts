import { Component, OnInit } from '@angular/core';
import { MessageResponseDTO } from 'src/app/dto/response/MEssageResponseDTO';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {

  currentUser: any = {};
  isDataAvailable: boolean  = false;
  message = new MessageResponseDTO();

  constructor(private userService: UserService, private router: Router, private notifyService : NotificationService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.isDataAvailable = true;
    });
  }



  onSubmit() {
    this.messageService.create(this.message).subscribe(() => {
      this.reset();
       this.notifyService.showSuccess('Message created.', 'Ok');
    }, error => { this.notifyService.showError(error)});
    this.refresh();
  }

  reset() {
    this.message = new MessageResponseDTO();
  }

  refresh(): void {
    window.location.reload();
  }

  goBack() {
    this.router.navigate(['home']);
  }

  userRole(): string {
    return this.currentUser.authorities[0].authority + '';
  }

}
