import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom } from 'src/app/model/classroom';
import { ClassroomService } from 'src/app/service/classroom.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {isStudent, isTeacher, isAdmin, isAdminUser, isTeacherUser} from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";
import {TeacherService} from "../../service/teacher.service";
import {TeacherDTO} from "../../dto/TeacherDTO";

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent implements OnInit {

  searchText;
  classrooms: Classroom[]=[];
  isDataAvailable: boolean = false;
  currentUser: any = {};
  teacher:TeacherDTO;
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
  private headteacherrender: boolean;

  constructor(private userService: UserService, private router: Router, private notifyService : NotificationService,
    private classroomService: ClassroomService, private adminService: AdminService,private teacherservice:TeacherService) { }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data => {
      this.currentUser = data;
      if (isAdminUser(this.currentUser)) {
        this.classroomService.findAll().subscribe(data => {
          this.classrooms = data;
          this.isDataAvailable = true;
          this.loadData();
        });

      } else if (isTeacherUser(this.currentUser)) {
        this.teacherservice.findByUserId(this.currentUser.id).subscribe(data => {// CHECK IF USER IS TEACHER
          if (data) {
            console.log("TEACHER");
            // this.teacherrender=true;
            this.teacher = data;
            console.log(this.teacher);
            this.classroomService.findByHeadteacherId(this.teacher.id).subscribe(data => {
              console.log(data);
              if (data) {
                this.classrooms.push(data);
                console.log(data);
                console.log(this.classrooms);
                this.loadData();
              }
            });
          }
        });
        }
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
    if(isAdmin(this.currentUser, this.router) || isTeacher(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['error-pages/404']);
    };
  }
  adminuser(){
    if(isAdminUser(this.currentUser)){
      return true
    }
    return false;
  }
  update(classroom_id: number) {
    this.router.navigate(['classroom/update', classroom_id]);
  }

  attendance(classroom_id: number) {
    this.router.navigate(['attendance/classroom', classroom_id]);
  }

  delete(classroom_id: number) {
    this.classroomService.delete(classroom_id).subscribe(() => {
      this.refresh();
      this.notifyService.showSuccess("Class deleted.", "Success");
    }, error => { this.notifyService.showError(error)});
  }

  finished(classroom_id: number) {
    this.adminService.finished(classroom_id).subscribe(() => {});
  }

  subjectDetails(classroom_id: number) {
    this.router.navigate(['subjectdetail/classroom' , classroom_id]);
  }

  exam(classroom_id: number) {
    this.router.navigate(['exam/classroom' , classroom_id]);
  }

  report(classroom_id: number) {
    this.router.navigate(['report/classroom', classroom_id]);
  }

  students(classroom_id: number) {
    this.router.navigate(['student/classroom', classroom_id]);
  }

  setSubject(classroom_id: number) {
    this.router.navigate(['classroom/setSubject', classroom_id]);
  }

  createClassroom() {
    this.router.navigate(['classroom/create']);
  }

  refresh(): void {
    window.location.reload();
  }
}
