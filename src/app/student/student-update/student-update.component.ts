import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { StudentResponseDTO } from 'src/app/dto/response/studentResponseDTO';
import { UserService } from 'src/app/service/user.service';
import { StudentService } from 'src/app/service/student.service';
import { Observable } from 'rxjs';
import { Classroom } from 'src/app/model/classroom';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassroomService } from 'src/app/service/classroom.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isStudent, isIdMatches, isTeacher, isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.scss']
})
export class StudentUpdateComponent implements OnInit {

  currentUser: any = {}
  id: number;
  student = new StudentResponseDTO();
  response = new StudentResponseDTO();
  isDataAvailable: boolean  = false;
  classrooms: Observable<Classroom[]>;
  selectedOption: any = {};
  selectedOptionGender: any = {};
  genders: string[] = ['Male', 'Female', 'Other'];

  constructor(private userService: UserService, private studentService: StudentService, private router: Router,
    private route: ActivatedRoute, private classroomService: ClassroomService, private notifyService : NotificationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.studentService.findById(this.id).subscribe(data => {
        this.student = data;
        this.classroomService.findById(data.classroom.id).subscribe(data => {
          this.classroomService.findAll().subscribe(data => {
            this.classrooms = data;
            this.isDataAvailable = true;
          });
        });
      });
    });
  }


  isDataChanged() {
    if(!this.response.dateOfBirth
      || !this.response.start_year
      || !this.response.classroom
      || !this.response.gender) return true;
    return false;
  }

  submit() {
    if(this.isDataChanged) {
      if(!this.selectedOptionGender)

      if(!this.response.mobileNo) this.response.mobileNo = this.student.mobileNo;
      if(!this.response.dateOfBirth) this.response.dateOfBirth = this.student.dateOfBirth;

      if(!this.response.start_year) this.response.start_year = this.student.start_year;

      if(!this.selectedOption) this.response.classroom = this.student.classroom;
      // else this.response.classroom = Number(this.selectedOption.id);
      if(!this.selectedOptionGender) this.response.gender = this.student.gender;
      else this.response.gender = this.selectedOptionGender;
      this.studentService.update(this.id, this.response).subscribe(() => {
        this.notifyService.showSuccess('Student updated.', 'Ok');
        this.refresh();
      }, error => {
        this.notifyService.showError(error)
      });
    }
  }

  goBack() {
    if(this.currentUser.authorities[0].authority + '' === 'ROLE_ADMIN') {
      this.router.navigate(['user/all']);
    } else {
      this.router.navigate(['home']);
    }
  }

  userUpdate() {
    this.userService.getById(this.student.fkuser.id).subscribe(data =>
      this.router.navigate(['user/update', data.id]), error => {  this.notifyService.showError(error)});
  }

  refresh() {
    this.userService.getById(this.student.fkuser.id).subscribe(data => {
      this.student = data;
    });
    this.response = new StudentResponseDTO();
    this.selectedOption = {};
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router) || isTeacher(this.currentUser, this.router) ||
    isIdMatches(this.currentUser, this.router, this.student.id, this.studentService)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }
}
