import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {StudentService} from "../../service/student.service";
import {TeacherService} from "../../service/teacher.service";
import {isAdmin} from "../../shared/roles";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  searchText;
  users: Observable<User[]>;
  isDataAvailable:boolean = false;
  currentUser: any = {};

  constructor(private userService: UserService, private router: Router,
              private studentService: StudentService, private teacherService: TeacherService,private notifyService : NotificationService ) { }
  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.userService.getAll().subscribe(data => {
        this.users = data;
        this.isDataAvailable = true;
      });
    });
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['error-pages/404']);
    }
  }

  details(user_id: number) {
    this.userService.getById(user_id).subscribe(data => {
      if(data.authorities[0].authority + '' === 'ROLE_STUDENT') {
        this.studentService.findByUserId(user_id).subscribe(data => this.router.navigate(['student/details', data.id]));
      } else if(data.authorities[0].authority + '' === 'ROLE_TEACHER'
        || data.authorities[0].authority + '' === 'ROLE_HEADTEACHER') {
        this.teacherService.findByUserId(user_id).subscribe(data => this.router.navigate(['teacher/details', data.id]));
      }
    });
  }

  update(user_id: number) {
    this.userService.getById(user_id).subscribe(data => {
      if(data.authorities[0].authority + '' === 'ROLE_STUDENT') {
        this.studentService.findByUserId(user_id).subscribe(data => this.router.navigate(['student/update', data.id]));
      } else if(data.authorities[0].authority + '' === 'ROLE_TEACHER'
        || data.authorities[0].authority + '' === 'ROLE_HEADTEACHER') {
        this.teacherService.findByUserId(user_id).subscribe(data => this.router.navigate(['teacher/update', data.id]));
      }
    });
  }

  createStudent() {
    this.router.navigate(['student/create']);
  }

  createTeacher() {
    this.router.navigate(['teacher/create']);
  }

  setCourse(student_id: number) {
    this.router.navigate(['course/setCourse', student_id]);
  }

  delete(user_id: number) {
    this.userService.getById(user_id).subscribe(data => {
      if(data.authorities[0].authority + '' === 'ROLE_STUDENT') {
        this.studentService.findByUserId(user_id).subscribe(data => {
          this.studentService.delete(data.id).subscribe(() => {
            this.userService.delete(user_id).subscribe(() => {
              this.refresh();
              this.notifyService.showSuccess("Student deleted", "Success");
            });
          });
        });
      } else if(data.authorities[0].authority + '' === 'ROLE_TEACHER'
        || data.authorities[0].authority + '' === 'ROLE_HEADTEACHER') {
        this.teacherService.findByUserId(user_id).subscribe(data => {
          this.teacherService.delete(data.id).subscribe(() => {
            this.userService.delete(user_id).subscribe(() => {
              this.refresh();
              this.notifyService.showSuccess("Teacher deleted", "Success");
            });
          },  error => {this.notifyService.showWarning("Failed, you must update ther courses, and classes", "Failed"); });
        });
      }
    });
  }

  refresh(): void {
    window.location.reload();
  }
}
