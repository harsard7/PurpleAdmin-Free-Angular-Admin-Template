import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {ClassroomService} from "../../service/classroom.service";
import {Teacher} from "../../model/teacher";
import {TeacherService} from "../../service/teacher.service";
import {Student} from "../../model/student";
import {StudentService} from "../../service/student.service";
import {NotificationService} from "../../service/notification.service";
import {isAdmin} from "../roles";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;
  public todoCollapsed = false;
  public studentCollapse = false;
  public adminCollapse= false;
  public teacherCollapse= false;
  public headTeacherCollapse= false;
  public timetableCollapsed= false;

  isAdmin: boolean = false;
  isHeadTeacher: boolean = false;
  isTeacher: boolean = false;
  isStudent: boolean = false;
  isDataAvailable: boolean = false;

  user: any;
  teacher = new Teacher();
  student = new Student();
  constructor(private router: Router, private userService: UserService,private classroomService: ClassroomService,private teacherService: TeacherService,private studentService: StudentService,private notifyService : NotificationService) { }

  ngOnInit() {
    const body = document.querySelector('body');
   this.user =this.userService.currentUser;
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });

    if(this.user){
      this.isDataAvailable = true;
      var tcr=this.user.authorities[0].authority + '';
      console.log(tcr);
      if(tcr === 'ROLE_HEADTEACHER' || tcr==='ROLE_TEACHER'){
        this.teacherService.findByUserId(this.user.id).subscribe(data =>  {
          this.teacher = data;
        })
      }
    }
  }

  userRole(): string {
    if(this.user){
      return this.user.authorities[0].authority + '';
    }
    return '';
  }
  hasSignedIn() {
    return !!this.userService.currentUser;
  }
  itIsAdmin() {
    if(isAdmin(this.userService.currentUser, this.router)) {
      return true;
    } else {
      return false;
      // this.router.navigate(['403']);
    }
  }
// ADMIN

  getAllUser() {
    this.router.navigate(['user/all']);
  }

  getAllClassroom() {
    this.router.navigate(['classroom/all']);
  }

  getAllSubject() {
    this.router.navigate(['subject/all']);
  }

  getAllRooms() {
    this.router.navigate(['rooms/all']);
  }

  updateAdmin() {
    this.userService.getById(this.user.id).subscribe(data =>
        this.router.navigate(['user/update', data.id]),
            error => this.notifyService.showError(error));
  }

  admin() {
    this.router.navigate(['admin/control']);
  }

  archives() {
    this.router.navigate(['admin/all']);
  }

  // HEAD TEACHER
  getMyClassroom() {
    this.classroomService.findByHeadteacherId(this.teacher.id).subscribe(data => {
      this.router.navigate(['student/classroom', data.id]);
    },error => this.notifyService.showError(error));
  }

  getAttendances() {
    this.classroomService.findByHeadteacherId(this.teacher.id).subscribe(data => {
      this.router.navigate(['attendance/classroom', data.id]);
    },error => this.notifyService.showError(error));
  }

  getStatistics() {
    this.classroomService.findByHeadteacherId(this.teacher.id).subscribe(data => {
      this.router.navigate(['statistics', data.id]);
    },error => this.notifyService.showError(error));
  }

  // TEACHER
  classrooms() {
    this.router.navigate(['classroom/all']);
  }

  preferences() {
    this.teacherService.findByUserId(this.user.id).subscribe(data => this.router.navigate(['teacher/preferences', data.id]));
  }

  updateTeacrPanel() {
    this.teacherService.findByUserId(this.user.id).subscribe(data => this.router.navigate(['teacher/update', data.id]));
  }

  subjects() {
    this.router.navigate(['subject/all']);
  }

  timetable() {
    this.router.navigate(['timetable/view', this.teacher.id]);
  }
  school() {
    this.router.navigate(['school/create']);
  }

  // STUDENT
  summary() {
    this.studentService.findByUserId(this.user.id).subscribe(data => this.router.navigate(['student/summary', data.id]));
  }

  studenttimetable() {
    this.studentService.findByUserId(this.user.id).subscribe(data => this.router.navigate(['timetable/view', data.id]));
  }

  reports() {
    this.studentService.findByUserId(this.user.id).subscribe(data =>  this.router.navigate(['report/student/', data.id]));
  }
  attendances() {
    this.studentService.findByUserId(this.user.id).subscribe(data =>    this.router.navigate(['attendance/student', data.id]));
  }

  studentsubject() {
    this.router.navigate(['subject/all']);
  }

  updateStudent() {
    this.studentService.findByUserId(this.user.id).subscribe(data => this.router.navigate(['student/update', data.id]));
  }

  details() {
    this.studentService.findByUserId(this.user.id).subscribe(data => this.router.navigate(['student/details', data.id]));
  }

  remarks() {
    this.studentService.findByUserId(this.user.id).subscribe(data =>  this.router.navigate(['remark', data.id]));
  }

  getAllStudent() {
    this.router.navigate(['student/all'])
  }

  getAllTeacher() {
    this.router.navigate(['teacher/all'])
  }
}
