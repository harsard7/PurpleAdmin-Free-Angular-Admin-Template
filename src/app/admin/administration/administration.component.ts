import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { AdminService } from 'src/app/service/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route } from '@angular/compiler/src/core';
import { isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  currentUser: any = {};
  isDataAvailable: boolean = false;

  constructor(private userService: UserService, private adminService: AdminService,
    private notifyService : NotificationService, private router: Router) { }

  ngOnInit() {
    console.log("AdministrationComponent");
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.isDataAvailable = true;
    });
  }


  create() {
    this.adminService.createArchive().subscribe(data => {
       this.notifyService.showSuccess('Archive created.', 'Ok');
    }, error => { this.notifyService.showError(error);});
  }

  newYear() {
    this.adminService.newYear().subscribe(data => {
       this.notifyService.showSuccess('New Year Started!', 'Ok');
    }, error => {  this.notifyService.showError(error);});
  }

  userRole() {
    return isAdmin(this.currentUser, this.router);
  }
}
