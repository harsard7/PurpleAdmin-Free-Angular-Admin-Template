import { Component, OnInit } from '@angular/core';
import {UserResponseDTO} from "../../dto/response/userResponseDTO";
import {EmployeeDTO} from "../../dto/EmployeeDTO";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {EmployeeService} from "../../service/employee.service";
import {NotificationService} from "../../service/notification.service";
import {EnumValues} from "enum-values";
import {Gender} from "../../enums/Gender";
import {UserType} from "../../enums/userType";
import {isAdmin} from "../../shared/roles";
import {ParentType} from "../../enums/parentType";
import {ParentService} from "../../service/parent.service";
import {ParentDTO} from "../../dto/parentDTO";


@Component({
  selector: 'app-parent-create',
  templateUrl: './parent-create.component.html',
  styleUrls: ['./parent-create.component.scss']
})
export class ParentCreateComponent implements OnInit {
  selectedParentType: any;
  selectedOptionGender: any;
  parentType: any[];
  genders: any[];

  user = new UserResponseDTO();
  parent = new ParentDTO();
  currentUser: any = {};
  userSubmitted: boolean = true;
  isDataAvailable: boolean  = false;
  selectedOption: any = {};


  constructor(private userService: UserService, private router: Router,  private parentservice: ParentService,
              private notifyService : NotificationService) { }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.parentType = EnumValues.getNamesAndValues(ParentType);
      this.genders = EnumValues.getNamesAndValues(Gender);
      // this.classroomService.findAll().subscribe(data => {
      this.isDataAvailable = true;
      // });
    });
  }

  // onUserSubmit() {
  onStudentSubmit() {
    // todo add validation
    this.user.role = 'ROLE_ASSISTANT';
    if(this.selectedParentType.name==='PRINCIPAL'){
      this.user.userType = UserType.ACADAMIC;
    }else{
      this.user.userType = UserType.NON_ACADAMIC;
    }
    this.user.username = this.parent.firstName+this.parent.lastName.charAt(0);
    this.user.password='changeme';
    this.user.firstName=this.parent.firstName;
    this.user.lastName=this.parent.lastName;
    this.user.fullName=this.parent.firstName+' '+this.parent.lastName;
    this.parent.gender=this.selectedOptionGender.name;
    this.parent.active=true;
    console.log(this.user);
    console.log('============================');
    console.log(this.parent);
    this.userService.create(this.user).subscribe((data) => {
      this.parent.fkUser=this.user=data;
      this.parentservice.create(this.parent).subscribe(()=>{
        this.notifyService.showSuccess("Parent Created !!", "Success");
        this.userSubmitted = true;
      });
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

  onStudentSubmite() {

    this.parent.gender = this.selectedOptionGender;
    this.parentservice.create(this.parent).subscribe(() => {
      this.notifyService.showSuccess("Parent Details Created !!", "Success");
      this.refresh();
    }, error => {
      this.notifyService.showSuccess(error,"Back end error");
      this.refresh();
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

  refresh() {
    this.user = new UserResponseDTO();
    this.parent = new ParentDTO();
    this.userSubmitted = false;
    this.selectedOption = {};
  }

  goBack() {
    this.router.navigate(['employee/all']);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

}

