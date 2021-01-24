import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserResponseDTO} from "../../dto/response/userResponseDTO";
import {StudentResponseDTO} from "../../dto/response/studentResponseDTO";
import {Classroom} from "../../model/classroom";
import {Observable} from "rxjs";
import {UserService} from "../../service/user.service";
import {StudentService} from "../../service/student.service";
import {Router} from "@angular/router";
import {ClassroomService} from "../../service/classroom.service";
import {isAdmin} from "../../shared/roles";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastrService} from "ngx-toastr";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {

  user = new UserResponseDTO();
  student = new StudentResponseDTO();
  currentUser: any = {};
  userSubmitted: boolean = false;
  isDataAvailable: boolean  = false;
  classrooms: Observable<Classroom[]>;
  selectedOption: any = {};
  selectedOptionGender: any = {};
  genders: string[] = ['MALE', 'FEMALE'];
  title = 'angulartoastr';

  constructor(private userService: UserService, private router: Router,  private studentService: StudentService,
              private classroomService: ClassroomService,private notifyService : NotificationService) { }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.classroomService.findAll().subscribe(data => {
        this.classrooms = data;
        this.isDataAvailable = true;
      });
    });
  }

  showToasterSuccess()
  {
    this.notifyService.showSuccess("Data shown successfully !!", "SMS sys")
  }

  showToasterError()
  {
    this.notifyService.showError("Something is wrong", "SMS sys")
  }

  showToasterInfo()
  {
    this.notifyService.showInfo("This is info", "SMS sys")
  }

  showToasterWarning(){
    this.notifyService.showWarning("This is warning", "SMS sys")
  }

  onUserSubmit() {
    this.user.role = 'ROLE_STUDENT';
    this.student.username = this.user.username;
    this.userService.create(this.user).subscribe(() => {
      this.notifyService.showSuccess("Student Created !!", "Success");
      this.userSubmitted = true;
    }, error => {
      this.userSubmitted = false;
      if (error.error instanceof ErrorEvent) {
        // client-side error
        // var err = `Error Code 2: ${error.status}\nMessage: ${error.error.message}`;
        this.notifyService.showError(error, "Client Side Error");
        console.log("Error 1:-> "+JSON.stringify(error));
      } else {
        // server-side error
       // var err = `Error Code 2: ${error.status}\nMessage: ${error.message}`;
       // var err = `Error Code 2: ${error.status}\nMessage: ${error.error.message}`;
        // this.errorMessage = `Connection Failed :\n Contact Admin`;
        // console.log("Error:-> "+JSON.stringify(error.error));
        this.notifyService.showError(error, "Server side Error");
      }
      });

  }

  onStudentSubmit() {
    this.student.classroom_id = Number(this.selectedOption.id);
    this.student.gender = this.selectedOptionGender;
    this.studentService.create(this.student).subscribe(() => {
      this.notifyService.showSuccess("Student Details Created !!", "Success");
      this.refresh();
    }, error => {
      this.errorHandle(error);
      this.refresh();
    });
  }

  refresh() {
    this.user = new UserResponseDTO();
    this.student = new StudentResponseDTO();
    this.userSubmitted = false;
    this.selectedOption = {};
  }

  goBack() {
    this.router.navigate(['student/all']);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

  errorHandle(error){
    if (error.error instanceof ErrorEvent) {
      // client-side error
      var err = `Error Code 2: ${error.status}\nMessage: ${error.error.message}`;
      this.notifyService.showError(err);
      console.log("Error 1:-> "+JSON.stringify(error));
    } else {
      // server-side error
      // var err = `Error Code 2: ${error.status}\nMessage: ${error.message}`;
      var err = `Error Code 2: ${error.status}\nMessage: ${error.error.message}`;
      // this.errorMessage = `Connection Failed :\n Contact Admin`;
      console.log("Error:-> "+JSON.stringify(error.error));
      this.notifyService.showError(err);
    }
  }

}
