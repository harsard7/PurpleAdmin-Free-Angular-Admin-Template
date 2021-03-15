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
import {TeacherDTO} from "../../dto/TeacherDTO";
import {EnumValues} from "enum-values";
import {Gender} from "../../enums/Gender";

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.scss']
})
export class TeacherCreateComponent implements OnInit {

  user = new UserResponseDTO();
  teacher = new TeacherDTO();
  currentUser: any = {};
  userSubmitted: boolean = true;
  isDataAvailable: boolean  = false;
  selectedOptionGender: any;
  genders: any[];

  constructor(private userService: UserService, private router: Router,
              private teacherService: TeacherService, private notifyService : NotificationService) { }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.isDataAvailable = true;
      this.genders = EnumValues.getNamesAndValues(Gender);
    });
  }



  onUserSubmit() {
    this.user.role = 'ROLE_TEACHER';
    this.userService.create(this.user).subscribe(() => {
      this.notifyService.showSuccess('Teacher Created.', 'Ok');
    }, error => {  this.notifyService.showError(error)});
    this.userSubmitted = true;
  }

  onTeacherSubmit() {
    console.log(this.teacher);
    this.user.role = 'ROLE_TEACHER';
    this.user.username = this.teacher.firstName+this.teacher.lastName.charAt(0);
    this.user.password='changeme';
    this.user.firstName=this.teacher.firstName;
    this.user.fullName=this.teacher.firstName+' '+this.teacher.lastName;
    this.teacher.gender=this.selectedOptionGender.name;

    this.userService.create(this.user).subscribe((data) => {
      this.teacher.fkUser=this.user=data;
      console.log(this.teacher);
      this.teacherService.create(this.teacher).subscribe(()=>{
        this.notifyService.showSuccess("Teacher Created !!", "Success");
        this.userSubmitted = true;
        this.refresh();
      });
    }, error => {
      this.userSubmitted = false;
      if (error.error instanceof ErrorEvent) {
        this.notifyService.showError(error, "Client Side Error");
        console.log("Error 1:-> "+JSON.stringify(error));
      } else {
        this.notifyService.showError(error, "Server side Error");
      }
    });

  }

  refresh() {
    this.userSubmitted = false;
    this.user = new UserResponseDTO();
    this.teacher = new TeacherDTO();
    this.selectedOptionGender = {};
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
