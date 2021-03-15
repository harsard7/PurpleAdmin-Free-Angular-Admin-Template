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
import {ProfessionType} from "../../enums/professionType";
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
    console.log(this.selectedclassroom);
    console.log(this.selectedclassroom.id);
    this.user.role = 'ROLE_STUDENT';
    this.user.username = this.student.firstName+this.student.lastName;
    this.user.password = 'changeme';
    this.user.userType = UserType.ACADAMIC;
    this.user.firstName =this.student.firstName;
    this.user.lastName = this.student.lastName;
    this.student.username = this.user.username;
    this.student.fkuser= this.user;
    this.student.parent= this.selectedparent;
    this.student.parentType= this.selectedParentType.name;
    this.student.status=StudentStatus.ADMISSION_PENDING;
    this.student.active=true;
    this.student.classroom_id=this.selectedclassroom.id;
     console.log(this.student);
    this.userService.create(this.user).subscribe((data) => {
      this.student.fkuser=data;
      this.onStudentSubmit();
      // this.notifyService.showSuccess("Student Created !!", "Success");
      this.userSubmitted = true;
    }, error => {
      this.userSubmitted = false;
      if (error.error instanceof ErrorEvent) {
        this.notifyService.showError(error, "Client Side Error");
        console.log("Error 1:-> "+JSON.stringify(error));
      } else {
        this.notifyService.showError(error, "Server side Error");
      }
     });
  }

  onStudentSubmit() {
    this.student.classroom_id = Number(this.selectedclassroom.id);
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
    this.selectedclassroom = null;
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

}
