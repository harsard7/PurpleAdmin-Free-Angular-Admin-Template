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
import {UserRole} from "../../enums/userRole";


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
   if(this.validate()) {
     this.user.role = 'ROLE_GUARDIAN';
     this.user.userType = UserType.NON_ACADAMIC;
     this.user.username = this.parent.firstName + this.parent.lastName.charAt(0);
     this.user.password = 'changeme';
     this.user.firstName = this.parent.firstName;
     this.user.lastName = this.parent.lastName;
     this.user.fullName = this.parent.firstName + ' ' + this.parent.lastName;
     this.parent.gender = this.selectedOptionGender.name;
     this.parent.active = true;
     this.userService.create(this.user).subscribe((data) => {
       this.parent.fkUser = this.user = data;
       this.parentservice.create(this.parent).subscribe(() => {
         this.notifyService.showSuccess("Parent Created !!", "Success");
         this.userSubmitted = true;
        this.refresh();
         this.goBack();
       });
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
    if(!this.selectedParentType){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Parent Type");
    }
    if(!this.parent.firstName){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Parent First name");
    }
    if(!this.parent.lastName){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Parent Last Name");
    }
    if(!this.parent.regNo){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Parent NIC/Passport");
    }
    if(!this.parent.email){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Parent Email");
    } if(!this.selectedOptionGender){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Parent Gender");
    }
    if(!this.parent.dateOfBirth){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Parent DOB");
    }
    if(!this.parent.address1){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Parent Address Line 1");
    }
    if(!this.parent.address2){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Parent Address Line 2");
    }
    if(!this.parent.city){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Parent City");
    }
    if(!this.parent.mobileNo1){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Parent Mobile No");
    }
    return valid;
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
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
  numbersOnly() {
    this.parent.mobileNo1 = this.parent.mobileNo1.replace(/[^0-9.-]/g, '');
  }

  refresh() {
    this.user = new UserResponseDTO();
    this.parent = new ParentDTO();
    this.userSubmitted = false;
    this.selectedParentType = undefined;
    this.selectedOptionGender = undefined;
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

