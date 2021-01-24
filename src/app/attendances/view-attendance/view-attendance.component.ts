import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance } from 'src/app/model/attendance';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AttendanceService} from "../../service/attendance.service";
import { StudentService } from 'src/app/service/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isStudent, isIdMatches, isTeacher, isAdmin } from 'src/app/shared/roles';
import { Student } from 'src/app/model/student';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.scss']
})
export class ViewAttendanceComponent implements OnInit {

  student_id: number;
  student: Student;
  searchText;
  isDataAvailable: boolean = false;
  currentUser: any = {};
  attendances: Observable<Attendance[]>;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,
    private attendanceService: AttendanceService, private studentService: StudentService,private notifyService : NotificationService) { }

  ngOnInit() {
    this.student_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.attendanceService.getAllByStudent(this.student_id).subscribe(data => {
        this.attendances = data;
        this.studentService.findById(this.student_id).subscribe(data => {
          this.student = data;
          this.isDataAvailable = true;
        })
      });
    });
  }


  userRole() {
    if(isAdmin(this.currentUser, this.router) || isTeacher(this.currentUser, this.router) ||
    this.currentUser.id == this.student.student.id) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

  delete(attendace_id: number) {
    this.attendanceService.delete(attendace_id).subscribe(() => {
      this.notifyService.showSuccess("Attendance deleted !!", "");
    }, error => {
      this.notifyService.showError(error);

    });
  }

  goBack() {
    this.studentService.findById(this.student_id).subscribe(data => {
      this.router.navigate(['student/classroom', data.classroom.id]);
    });
  }
}
