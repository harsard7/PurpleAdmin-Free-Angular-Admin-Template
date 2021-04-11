import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message';
import { MessageResponseDTO } from 'src/app/dto/response/MEssageResponseDTO';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';
import { TeacherService } from 'src/app/service/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-update-message',
  templateUrl: './update-message.component.html',
  styleUrls: ['./update-message.component.scss']
})
export class UpdateMessageComponent implements OnInit {

  currentUser: any = {};
  isDataAvailable: boolean = false;
  message_id: number;
  message = new Message();
  response = new MessageResponseDTO();

  constructor(private userService: UserService, private teacherService: TeacherService, private notifyService : NotificationService,
    private router: Router, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit() {
    this.message_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.messageService.findById(this.message_id).subscribe(data => {
        this.message = data;
        this.response.text = this.message.text;
        console.log(this.message);
        this.isDataAvailable = true;
      });
    });
  }



  isDataChanged() {
    if(!this.response.text || this.response.text == this.message.text) return true;
    return false;
  }

  onSubmit() {
    if(this.isDataChanged) {
      if(!this.response.text) this.response.text = this.message.text;
      this.messageService.update(this.message_id, this.response).subscribe(() => {
         this.notifyService.showSuccess('Message updated', 'Ok');
        this.goBack();
      });
    }
  }

  goBack() {
    this.router.navigate(['']);
  }

  userRole(): string {
    return this.currentUser.authorities[0].authority + '';
  }
}
