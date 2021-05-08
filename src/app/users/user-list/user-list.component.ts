import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {StudentService} from "../../service/student.service";
import {TeacherService} from "../../service/teacher.service";
import {isAdmin} from "../../shared/roles";
import {NotificationService} from "../../service/notification.service";
import {EmployeeService} from "../../service/employee.service";

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
  // table
  config: any;
  collection = { count: 0, data: [] };
  public maxSize: number = 5;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '<',
    nextLabel: '>',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  constructor(private userService: UserService, private router: Router,
              private studentService: StudentService, private teacherService: TeacherService,private notifyService : NotificationService,private employeeservice:EmployeeService) { }
  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.userService.getAll().subscribe(data => {
        this.collection.data=this.users = data;
        this.isDataAvailable = true;
        this.loadData();
      });
    });
  }
  loadData() {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }
  onPageChange(event){
    // console.log(event);
    this.config.currentPage = event;
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
      }else if(data.authorities[0].authority + '' === 'ROLE_ADMIN') {
        this.employeeservice.findByUserId(user_id).subscribe(data => this.router.navigate(['employee/details', data.id]));
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
      } else if(data.authorities[0].authority + '' === 'ROLE_ADMIN') {
        this.employeeservice.findByUserId(user_id).subscribe(data => this.router.navigate(['employee/update', data.id]));
      }
    });
  }



  createTeacher() {
    this.router.navigate(['teacher/create']);
  }

  setSubject(student_id: number) {
    this.router.navigate(['subject/setSubject', student_id]);
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
          },  error => {this.notifyService.showWarning("Failed, you must update the subjects, and classes", "Failed"); });
        });
      }
    });
  }

  refresh(): void {
    window.location.reload();
  }
}
