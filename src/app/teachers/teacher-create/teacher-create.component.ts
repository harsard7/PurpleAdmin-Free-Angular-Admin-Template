import { Component, OnInit } from '@angular/core';
import { UserResponseDTO } from 'src/app/dto/response/userResponseDTO';
import { TeacherResponseDTO } from 'src/app/dto/response/teacherResponseDTO';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/service/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.scss']
})
export class TeacherCreateComponent implements OnInit {

  user = new UserResponseDTO();
  teacher = new TeacherResponseDTO();
  currentUser: any = {};
  userSubmitted: boolean = false;
  isDataAvailable: boolean  = false;
  selectedOption: any = {};

  constructor(private userService: UserService, private router: Router,
    private teacherService: TeacherService, private notifyService : NotificationService) { }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.isDataAvailable = true;
    });
  }



  onUserSubmit() {
    this.user.role = 'ROLE_TEACHER';
    this.teacher.username = this.user.username;
    this.userService.create(this.user).subscribe(() => {
       this.notifyService.showSuccess('Teacher Created.', 'Ok');
    }, error => {  this.notifyService.showError(error)});
    this.userSubmitted = true;
  }

  onTeacherSubmit() {
    this.teacherService.create(this.teacher).subscribe(() => {

    } , error => {  this.notifyService.showError(error)});
    this.refresh();
     this.notifyService.showSuccess('Teacher created', 'Ok')
  }

  refresh() {
    this.userSubmitted = false;
    this.user = new UserResponseDTO();
    this.teacher = new TeacherResponseDTO();
    this.selectedOption = {};
  }

  goBack() {
    this.router.navigate(['teacher/all']);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }
}
