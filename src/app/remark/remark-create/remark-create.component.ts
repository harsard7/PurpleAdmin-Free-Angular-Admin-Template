import { Component, OnInit } from '@angular/core';
import { RemarkResponseDTO } from 'src/app/dto/response/RemarkResponseDTO';
import { RemarkService } from 'src/app/service/remark.service';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isStudent, isTeacher, isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-remark-create',
  templateUrl: './remark-create.component.html',
  styleUrls: ['./remark-create.component.scss']
})
export class RemarkCreateComponent implements OnInit {

  currentUser: any = {};
  isDataAvailable: boolean  = false;
  student_id: number;
  remark = new RemarkResponseDTO();

  constructor(private userService: UserService, private router: Router, private notifyService : NotificationService,
    private remarkService: RemarkService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.isDataAvailable = true;
    });
  }


  onSubmit() {
    this.remark.student_id = this.student_id;
    this.remarkService.create(this.remark).subscribe(() => {
      this.reset();
       this.notifyService.showSuccess('Remark created.', 'Ok');
    }, error => { this.notifyService.showError(error)});
    this.refresh();
  }

  reset() {
    this.remark = new RemarkResponseDTO();
  }

  refresh(): void {
    window.location.reload();
  }

  goBack() {
    this.router.navigate(['home']);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router) || isTeacher(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

}
