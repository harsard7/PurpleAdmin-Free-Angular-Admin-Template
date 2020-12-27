import { Component, OnInit } from '@angular/core';
import {isAdmin} from "../../shared/roles";
import {UserResponseDTO} from "../../dto/response/userResponseDTO";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {TeacherService} from "../../service/teacher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentService} from "../../service/student.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  currentUser: any = {};
  isDataAvailable: boolean = false;
  id: number;
  user = new User();
  response = new UserResponseDTO();
  newPassword: string;
  reEnterPassword: string;
  userSubmitted=false;

  constructor(private userService: UserService, private teacherService: TeacherService,
              private router: Router, private route: ActivatedRoute, private studentService: StudentService,private notifyService : NotificationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.userService.getById(this.id).subscribe(data => {
        this.user = data;
        this.isDataAvailable = true;
      });

    });
  }



  onSubmit() {
    if(this.isDataChanged && this.isUsernameUnique && this.isPasswordMatch) {
      if(!this.response.fullName) this.response.fullName = this.user.fullName;
      if(!this.response.username) this.response.username = this.user.username;
      if(!this.newPassword) this.response.password = this.newPassword;
      this.userService.update(this.id, this.response).subscribe(() => {
        this.userSubmitted=true;
        this.refresh();
        this.notifyService.showSuccess("User updatedd", "Success");
      });
    }
  }

  refresh() {
    this.userService.getById(this.id).subscribe(data => {
      this.user = data;
    });
    this.response = new UserResponseDTO();
    this.newPassword = null;
    this.reEnterPassword = null;
  }

  isDataChanged() {
    if(!this.response.fullName
      || !this.response.username
      || !this.newPassword) return true;
    return false;
  }

  isPasswordMatch() {
    return this.newPassword === this.reEnterPassword;
  }

  isUsernameUnique() {
    var unique = false;
    this.userService.isUsernameUnique(this.response.username).subscribe(data => unique = data);
    return unique;
  }

  goBack() {
    this.userService.getById(this.id).subscribe(data => {
      if(data.authorities[0].authority + '' === 'ROLE_STUDENT') {
        this.studentService.findByUserId(this.id).subscribe(data => {
          this.router.navigate(['student/update', data.id]);

        });
      } else if(data.authorities[0].authority + '' === 'ROLE_TEACHER'
        || data.authorities[0].authority + '' === 'ROLE_HEADTEACHER') {
        this.teacherService.findByUserId(this.id).subscribe(data => {
          this.router.navigate(['teacher/update', data.id]);
        });
      }
    });
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router) || this.currentUser.id === this.id) {
      return true;
    } else {
      this.router.navigate(['error-pages/404']);
    }
  }
}

