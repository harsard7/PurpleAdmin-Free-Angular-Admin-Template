import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {StudentService} from "../../service/student.service";
import {TeacherService} from "../../service/teacher.service";
import {NotificationService} from "../../service/notification.service";
import {isAdmin} from "../../shared/roles";
import {Teacher} from "../../model/teacher";

@Component({
  selector: 'app-teachers-all',
  templateUrl: './teachers-all.component.html',
  styleUrls: ['./teachers-all.component.scss']
})
export class TeachersAllComponent implements OnInit {
  searchText;
  teachers: Observable<Teacher[]>;
  isDataAvailable:boolean = false;
  currentUser: any = {};
  // table
  config: any;
  collection = { count: 0, data: [] };
  public maxSize: number = 7;
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
              private studentService: StudentService, private teacherService: TeacherService,private notifyService : NotificationService ) { }
  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.teacherService.findAll().subscribe(data => {
        this.collection.data=this.teachers = data;
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

  // details(user_id: number) {
  //   this.userService.getById(user_id).subscribe(data => {
  //     if(data.authorities[0].authority + '' === 'ROLE_STUDENT') {
  //       this.studentService.findByUserId(user_id).subscribe(data => this.router.navigate(['student/details', data.id]));
  //     } else if(data.authorities[0].authority + '' === 'ROLE_TEACHER'
  //       || data.authorities[0].authority + '' === 'ROLE_HEADTEACHER') {
  //       this.teacherService.findByUserId(user_id).subscribe(data => this.router.navigate(['teacher/details', data.id]));
  //     }
  //   });
  // }
  details(user_id: number) {
    this.router.navigate(['teacher/details', user_id]);
  }


  // update(user_id: number) {
  //   this.userService.getById(user_id).subscribe(data => {
  //     if(data.authorities[0].authority + '' === 'ROLE_STUDENT') {
  //       this.studentService.findByUserId(user_id).subscribe(data => this.router.navigate(['student/update', data.id]));
  //     } else if(data.authorities[0].authority + '' === 'ROLE_TEACHER'
  //       || data.authorities[0].authority + '' === 'ROLE_HEADTEACHER') {
  //       this.teacherService.findByUserId(user_id).subscribe(data => this.router.navigate(['teacher/update', data.id]));
  //     }
  //   });
  // }

  update(user_id: number) {
    this.router.navigate(['teacher/update', user_id])

      }

  createStudent() {
    this.router.navigate(['student/create']);
  }

  createTeacher() {
    this.router.navigate(['teacher/create']);
  }

  setSubject(student_id: number) {
    this.router.navigate(['Subject/setSubject', student_id]);
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
          },  error => {this.notifyService.showWarning("Failed, you must update ther subjects, and classes", "Failed"); });
        });
      }
    });
  }

  refresh(): void {
    window.location.reload();
  }
}
