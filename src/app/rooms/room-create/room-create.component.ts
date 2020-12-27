import { Component, OnInit } from '@angular/core';
import { RoomResponseDTO } from 'src/app/dto/response/roomResponseDTO';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomService } from 'src/app/service/room.service';
import { isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit {

  currentUser: any = {};
  isDataAvailable: boolean  = false;
  room = new RoomResponseDTO();

  constructor(private userService: UserService, private router: Router, private notifyService : NotificationService,
    private roomService: RoomService) { }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.isDataAvailable = true;
    });
  }



  onSubmit() {
    this.roomService.create(this.room).subscribe(() => {
      this.reset();
       this.notifyService.showSuccess('Room created.', 'Ok');
    }, error => { this.notifyService.showError("Failed ", "");});
    this.refresh();
  }

  reset() {
    this.room = new RoomResponseDTO();
  }

  refresh(): void {
    window.location.reload();
  }

  goBack() {
    this.router.navigate(['rooms/all']);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }
}
