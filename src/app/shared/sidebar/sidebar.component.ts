import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {ClassroomService} from "../../service/classroom.service";
import {Teacher} from "../../model/teacher";
import {TeacherService} from "../../service/teacher.service";
import {Student} from "../../model/student";
import {StudentService} from "../../service/student.service";

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

  isAdmin: boolean = false;
  isHeadTeacher: boolean = false;
  isTeacher: boolean = false;
  isStudent: boolean = false;
  isDataAvailable: boolean = false;

  user: any;
  teacher = new Teacher();log
  student = new Student();
  constructor(private router: Router, private userService: UserService,private classroomService: ClassroomService,private teacherService: TeacherService,private studentService: StudentService) { }

  ngOnInit() {
    const body = document.querySelector('body');

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

    this.userService.getMyInfo().toPromise().then(data =>  {
      this.user = data;
      this.isDataAvailable = true;
    });
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

// ADMIN

  getAllUser() {
    this.router.navigate(['user/all']);
  }

  getAllClassroom() {
    this.router.navigate(['classroom/all']);
  }

  getAllCourse() {
    this.router.navigate(['course/all']);
  }

  getAllRooms() {
    this.router.navigate(['rooms/all']);
  }

  updateAdmin() {
    this.userService.getById(this.user.id).subscribe(data =>
        this.router.navigate(['user/update', data.id]));
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
    });
  }

  getAttendances() {
    this.classroomService.findByHeadteacherId(this.teacher.id).subscribe(data => {
      this.router.navigate(['attendance/classroom', data.id]);
    });
  }

  getStatistics() {
    this.classroomService.findByHeadteacherId(this.teacher.id).subscribe(data => {
      this.router.navigate(['statistics', data.id]);
    });
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

  courses() {
    this.router.navigate(['course/all']);
  }

  timetable() {
    this.router.navigate(['timetable/view', this.teacher.id]);
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

  studentcourse() {
    this.router.navigate(['course/all']);
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

}
