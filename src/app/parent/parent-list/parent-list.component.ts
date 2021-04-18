import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {EmployeeDTO} from "../../dto/EmployeeDTO";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {StudentService} from "../../service/student.service";
import {TeacherService} from "../../service/teacher.service";
import {NotificationService} from "../../service/notification.service";
import {EmployeeService} from "../../service/employee.service";
import {isAdmin} from "../../shared/roles";
import {ParentDTO} from "../../dto/parentDTO";
import {ParentService} from "../../service/parent.service";

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.scss']
})
export class ParentListComponent implements OnInit {
  searchText;
  parents: Observable<ParentDTO[]>;
  isDataAvailable: boolean = false;
  currentUser: any = {};
  // table
  config: any;
  collection = {count: 0, data: []};
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
              private  parentService:ParentService,private studentService: StudentService, private teacherService: TeacherService, private notifyService: NotificationService, private employeeservice: EmployeeService) {
  }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data => {
      this.currentUser = data;
      this.parentService.findAll().subscribe(data => {
        this.collection.data = this.parents = data;
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

  onPageChange(event) {
    // console.log(event);
    this.config.currentPage = event;
  }

  userRole() {
    if (isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['error-pages/404']);
    }
  }

  details(user_id: number) {
    this.userService.getById(user_id).subscribe(data => {
      // if(data.authorities[0].authority + '' === 'ROLE_ADMIN') {
      this.parentService.findByUserId(user_id).subscribe(data => this.router.navigate(['parent/details', data.id]));
      // }
    });
  }

  update(user_id: number) {
    this.userService.getById(user_id).subscribe(data => {
      // if(data.authorities[0].authority + '' === 'ROLE_ADMIN') {
      this.parentService.findByUserId(user_id).subscribe(data => this.router.navigate(['parent/update', data.id]));
      // }
    });
  }

  create() {
    this.router.navigate(['parent/create']);
  }



  delete(user_id: number) {
    // TODO
    // this.userService.getById(user_id).subscribe(data => {
    //   if(data.authorities[0].authority + '' === 'ROLE_STUDENT') {
    //     this.studentService.findByUserId(user_id).subscribe(data => {
    //       this.studentService.delete(data.id).subscribe(() => {
    //         this.userService.delete(user_id).subscribe(() => {
    //           this.refresh();
    //           this.notifyService.showSuccess("Student deleted", "Success");
    //         });
    //       });
    //     });
    //   } else if(data.authorities[0].authority + '' === 'ROLE_TEACHER'
    //     || data.authorities[0].authority + '' === 'ROLE_HEADTEACHER') {
    //     this.teacherService.findByUserId(user_id).subscribe(data => {
    //       this.teacherService.delete(data.id).subscribe(() => {
    //         this.userService.delete(user_id).subscribe(() => {
    //           this.refresh();
    //           this.notifyService.showSuccess("Teacher deleted", "Success");
    //         });
    //       },  error => {this.notifyService.showWarning("Failed, you must update the subjects, and classes", "Failed"); });
    //     });
    //   }
    // });
  }

  refresh(): void {
    window.location.reload();
  }

}
