import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../service/notification.service";
import {MessageService} from "../../service/message.service";
import {UserService} from "../../service/user.service";
import {Observable} from "rxjs";
import {Message} from "../../model/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  user: any;
  isDataAvailable:boolean = false;
  messages: Observable<Message[]>;

  constructor(private userService: UserService, private messageService: MessageService,
              private router: Router, private notifyService : NotificationService) { }

  ngOnInit() {
    this.messageService.findAll().subscribe(data => {
      this.messages = data;
    });
    this.userService.getMyInfo().toPromise().then(data =>  {
      console.log("data "+JSON.stringify(data));
      this.user = data;
      this.isDataAvailable = true;
    });
    console.log("data ");
  }


  ngOnDestroy() {
    this.user = null;
  }

  userRole(): string {
    return this.user.authorities[0].authority + '';
  }

  create() {
    this.router.navigate(['message/create']);
  }

  update(id: number) {
    this.router.navigate(['message/update', id]);
  }

  delete(id: number) {
    this.messageService.delete(id).subscribe(() => {
      this.refresh();
       this.notifyService.showSuccess('Message deleted.', 'Ok');
    }, error => {  this.notifyService.showError("Failed ", "");});
  }

  refresh(): void {
    window.location.reload();
  }

}
