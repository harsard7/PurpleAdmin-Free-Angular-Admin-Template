import {Component, OnInit} from '@angular/core';
import {UserResponseDTO} from "../../dto/response/userResponseDTO";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

import {NotificationService} from "../../service/notification.service";
import {isAdmin} from "../../shared/roles";
import {EmployeeDTO} from "../../dto/EmployeeDTO";
import {EmployeeService} from "../../service/employee.service";
import {EnumValues} from "enum-values";
import {ProfessionType} from "../../enums/professionType";
import {UserType} from "../../enums/userType";
import {Gender} from "../../enums/Gender";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-emplyee-create',
  templateUrl: './emplyee-create.component.html',
  styleUrls: ['./emplyee-create.component.scss']
})
export class EmplyeeCreateComponent implements OnInit {
  G_USER_NAME='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  selectedEmplType:any;
  selectedOptionGender:any;
  employeetypes: any[];
  genders: any[];

  user = new UserResponseDTO();
  employee = new EmployeeDTO();
  currentUser: any = {};
  userSubmitted: boolean = true;
  isDataAvailable: boolean  = false;
  selectedOption: any = {};
  myGroup: FormGroup = new FormGroup({});

  constructor(private userService: UserService, private router: Router,  private employeeservice: EmployeeService,
              private notifyService : NotificationService,private fb: FormBuilder) {
    this.myGroup = fb.group({
      contact: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      dob: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.employeetypes = EnumValues.getNamesAndValues(ProfessionType);
      this.genders = EnumValues.getNamesAndValues(Gender);
      // this.classroomService.findAll().subscribe(data => {
        this.isDataAvailable = true;
      // });
    });
  }

  // onUserSubmit() {
  get f(){
    return this.myGroup.controls;
  }
    onEmployeeSubmit() {
      if(this.validate()) {
        this.user.role = 'ROLE_ASSISTANT';
        if (this.selectedEmplType.name === 'PRINCIPAL') {
          this.user.userType = UserType.ACADAMIC;
          this.user.role = 'ROLE_ADMIN';
        } else {
          this.user.userType = UserType.NON_ACADAMIC;
          this.user.role = 'ROLE_STAFF';
        }
        this.user.username = this.employee.firstName + this.employee.lastName;
        this.user.password = 'changeme';

        this.user.firstName = this.employee.firstName;
        this.user.lastName = this.employee.lastName;
        this.user.fullName = this.employee.firstName + ' ' + this.employee.lastName;

        this.employee.profession = this.selectedEmplType.name;
        this.employee.gender = this.selectedOptionGender.name;
        this.employee.active = true;
        this.userService.create(this.user).subscribe((data) => {
          this.employee.fkUser = this.user = data;

          this.employeeservice.create(this.employee).subscribe(() => {
            this.notifyService.showSuccess("Employee Created !!", "Success");
            this.userSubmitted = true;
            this.employee = new EmployeeDTO();
          });
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
  var  valid=true;
    if(!this.selectedEmplType){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Employee Type");
    }
    if(!this.employee.firstName){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Employee First name");
    }
    if(!this.employee.lastName){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Employee Last Name");
    }
    if(!this.employee.regNo){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Employee Reg No");
    }
    if(!this.employee.email){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Employee Email");
    } if(!this.selectedOptionGender){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Employee Gender");
    }
    if(!this.employee.dateOfBirth){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Employee DOB");
    }
    if(!this.employee.address1){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Employee Address Line 1");
    }
    if(!this.employee.address2){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Employee Address Line 2");
    }
    if(!this.employee.city){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Employee City");
    }
    if(!this.employee.mobileNo1){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Employee Mobile No");
    }
    // if(!this.employee.profession){
    //   valid=false;
    //   this.notifyService.showWarning(null, "Please Select Employee profession");
    // }
    return valid;
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  refresh() {
    this.user = new UserResponseDTO();
    this.employee = new EmployeeDTO();
    this.userSubmitted = false;
    this.selectedOption = {};
  }

  goBack() {
    this.router.navigate(['employee/all']);
  }
  itIsnumber(value){
    console.log(value);
    // check to see if the control value is no a number
    if (isNaN(value)) return false;

  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

}

