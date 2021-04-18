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
import {UserResponseDTO} from "../../dto/response/userResponseDTO";
import {ParentDTO} from "../../dto/parentDTO";
import {UserType} from "../../enums/userType";
import {StudentStatus} from "../../enums/studentStatus";
import {EnumValues} from "enum-values";
import {ParentType} from "../../enums/parentType";
import {ParentService} from "../../service/parent.service";

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.scss']
})
export class StudentUpdateComponent implements OnInit {

  user = new UserResponseDTO();
  student = new StudentResponseDTO();
  currentUser: any = {};
  userSubmitted: boolean = true;
  isDataAvailable: boolean  = false;
  classrooms: Observable<Classroom[]>;
  selectedclassroom: Classroom;
  joinedclassroom: Classroom;
  selectedOptionGender: any = {};
  selectedstatus: any ;
  genders: string[] = ['MALE', 'FEMALE'];
  selectedparent: ParentDTO;
  parents: Observable<ParentDTO[]>;
  selectedParentType: any;
  parenttypes: any[];
  stuStatuses: any[];
  student_id: number;

  constructor(private userService: UserService, private router: Router,  private studentService: StudentService,
              private route: ActivatedRoute,private classroomService: ClassroomService,private notifyService : NotificationService,private parentService:ParentService) { }

  ngOnInit() {
    this.student_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.studentService.findById(this.student_id).subscribe(data => {
        this.student = data;
        //  this.classroomService.findAll().subscribe(data => {
        // this.classrooms = data;
        this.isDataAvailable = true;

        this.selectedparent= this.student.parent;
        this.selectedOptionGender= this.student.gender;
        this.selectedParentType= this.student.parentType;
        this.selectedclassroom= this.student.classroom;
        this.selectedstatus= this.student.status;
        this.stuStatuses = EnumValues.getNamesAndValues(StudentStatus);
        console.log(this.selectedstatus);
        console.log(typeof this.selectedstatus);
        console.log( typeof this.student.status);
        console.log(StudentStatus[StudentStatus.STUDYING] );
        this.selectedstatus=StudentStatus[StudentStatus.STUDYING];
        // this.selectedstatus="STUDYING";
        if("STUDYING"===StudentStatus[StudentStatus.STUDYING]){
          console.log('fgfdgfd');
        }

       // this.parenttypes = EnumValues.getNamesAndValues(ParentType);
      // });
     });
    });
  }

  onUserSubmit() {
    if(this.validate()) {
      this.studentService.update(this.student.id,this.student).subscribe(() => {
        this.notifyService.showSuccess(null, "Student Updated");
        this.goBack();
      }, error => {
        this.userSubmitted = false;
        if (error.error instanceof ErrorEvent) {
          this.notifyService.showError(error, "Client Side Error");
        } else {
          this.notifyService.showError(error, "Server side Error");
        }
      });
    }
  }
  validate(){
    var valid=true;
    // if(!this.selectedparent){
    //   valid=false;
    //   this.notifyService.showWarning(null, "Please Select Parent ");
    // }
    if(!this.student.firstName){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Student First name");
    }
    if(!this.student.lastName){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Student Last Name");
    }else if(this.student.lastName.length<3){
      valid=false;
      this.notifyService.showWarning(null, "Student Lastname length should be minimum 3");
    }
    if(!this.student.guardianRelation){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Student Guardian Relation");
    }
    if(!this.selectedOptionGender){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Student Gender");
    } if(!this.selectedParentType){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Parent type");
    }
    if(!this.student.dateOfBirth){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Student DOB");
    }

    if(!this.student.mobileNo){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Student mobile no");
    }
    if(!this.selectedclassroom){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Join class room");
    }
    return valid;
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }


  refresh() {
    this.user = new UserResponseDTO();
    this.student = new StudentResponseDTO();
    this.userSubmitted = false;
    this.selectedclassroom = undefined;
    this.selectedParentType = undefined;
    this.selectedOptionGender = undefined;
    this.selectedparent = undefined;
  }

  goBack() {
    this.router.navigate(['student/all']);
  }

  createParent(){
    this.router.navigate(['parent/create']);
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
