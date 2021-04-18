import {Component, OnInit} from '@angular/core';
import {UserResponseDTO} from "../../dto/response/userResponseDTO";
import {StudentResponseDTO} from "../../dto/response/studentResponseDTO";
import {Classroom} from "../../model/classroom";
import {Observable} from "rxjs";
import {UserService} from "../../service/user.service";
import {StudentService} from "../../service/student.service";
import {Router} from "@angular/router";
import {ClassroomService} from "../../service/classroom.service";
import {isAdmin} from "../../shared/roles";
import {NotificationService} from "../../service/notification.service";
import {ParentService} from "../../service/parent.service";
import {ParentDTO} from "../../dto/parentDTO";
import {UserType} from "../../enums/userType";
import {StudentStatus} from "../../enums/studentStatus";
import {EnumValues} from "enum-values";
import {ParentType} from "../../enums/parentType";

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {

  user = new UserResponseDTO();
  student = new StudentResponseDTO();
  currentUser: any = {};
  userSubmitted: boolean = true;
  isDataAvailable: boolean  = false;
  classrooms: Observable<Classroom[]>;
  selectedclassroom: Classroom;
  joinedclassroom: Classroom;
  selectedOptionGender: any = {};
  genders: string[] = ['MALE', 'FEMALE'];
  selectedparent: ParentDTO;
  parents: Observable<ParentDTO[]>;
  selectedParentType: any;
  parenttypes: any[];

  constructor(private userService: UserService, private router: Router,  private studentService: StudentService,
              private classroomService: ClassroomService,private notifyService : NotificationService,private parentService:ParentService) { }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.classroomService.findAll().subscribe(data => {
        this.classrooms = data;
        this.isDataAvailable = true;
        this.parenttypes = EnumValues.getNamesAndValues(ParentType);
      });
    });
    this.parentService.findAll().subscribe(data => {
      this.parents=data;
      this.isDataAvailable = true;
    });
  }

  onUserSubmit() {
    if(this.validate()) {
      this.user.role = 'ROLE_STUDENT';
      this.user.username = this.student.firstName + this.student.lastName.substring(0,2);
      this.user.password = 'changeme';
      this.user.userType = UserType.ACADAMIC;
      this.user.firstName = this.student.firstName;
      this.user.lastName = this.student.lastName;
      this.student.fkuser = this.user;
      this.student.parent = this.selectedparent;
      this.student.parentType = this.selectedParentType.name;
      this.student.status = StudentStatus.ADMISSION_PENDING;
      this.student.active = true;
      this.student.classroom = this.selectedclassroom;
      this.student.JoinClass = this.joinedclassroom;
      this.userService.create(this.user).subscribe((data) => {
        this.student.fkuser = data;
        this.onStudentSubmit();
        // this.notifyService.showSuccess("Student Created !!", "Success");
        this.userSubmitted = true;
      }, error => {
        this.userSubmitted = false;
        if (error.error instanceof ErrorEvent) {
          this.notifyService.showError(error, "Client Side Error");
          console.log("Error 1:-> " + JSON.stringify(error));
        } else {
          this.notifyService.showError(error, "Server side Error");
        }
      });
    }
  }
  validate(){
    var valid=true;
    if(!this.selectedparent){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Parent ");
    }
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
  onStudentSubmit() {
    this.student.gender = this.selectedOptionGender;
    this.studentService.create(this.student).subscribe(() => {
      this.notifyService.showSuccess("Student Details Created !!", "Success");
      this.refresh();
      this.goBack();
    }, error => {
      this.errorHandle(error);
      // this.refresh();
    });
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
