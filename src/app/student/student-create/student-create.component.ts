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
  genders: string[] = ['Male', 'Female', 'Other'];
  title = 'angulartoastr';

  constructor(private userService: UserService, private router: Router,  private studentService: StudentService, private classroomService: ClassroomService,private notifyService : NotificationService) { }

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
    this.notifyService.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")
  }

  showToasterError()
  {
    this.notifyService.showError("Something is wrong", "ItSolutionStuff.com")
  }

  showToasterInfo()
  {
    this.notifyService.showInfo("This is info", "ItSolutionStuff.com")
  }

  showToasterWarning(){
    this.notifyService.showWarning("This is warning", "ItSolutionStuff.com")
  }
open(){
  this.showToasterSuccess();
}




  onUserSubmit() {
    this.user.role = 'ROLE_STUDENT';
    this.student.username = this.user.username;
    this.userService.create(this.user).subscribe(() => {
      this.notifyService.showSuccess("Student Created !!", "Student")
      this.userSubmitted = true;
      console.log(" error in username submit ");
    }, error => {  this.notifyService.showError("Failed !!", "Student");});
    this.userSubmitted = false;
  }

  onStudentSubmit() {
    this.student.classroom_id = Number(this.selectedOption.id);
    this.student.gender = this.selectedOptionGender;
    this.studentService.create(this.student).subscribe(() => {

    }, error => {this.notifyService.showError("Failed !!", "Student");});
    this.refresh();
  }

  refresh() {
    this.user = new UserResponseDTO();
    this.student = new StudentResponseDTO();
    this.userSubmitted = false;
    this.selectedOption = {};
  }

  goBack() {
    this.router.navigate(['/user/all']);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }
}
