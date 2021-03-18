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


@Component({
  selector: 'app-emplyee-create',
  templateUrl: './emplyee-create.component.html',
  styleUrls: ['./emplyee-create.component.scss']
})
export class EmplyeeCreateComponent implements OnInit {
  G_USER_NAME='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  selectedEmplType: any;
  selectedOptionGender: any;
  employeetypes: any[];
  genders: any[];

  user = new UserResponseDTO();
  employee = new EmployeeDTO();
  currentUser: any = {};
  userSubmitted: boolean = true;
  isDataAvailable: boolean  = false;
  selectedOption: any = {};


  constructor(private userService: UserService, private router: Router,  private employeeservice: EmployeeService,
              private notifyService : NotificationService) { }

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
    onEmployeeSubmit() {
    // todo add validation
    this.user.role = 'ROLE_ASSISTANT';
    if(this.selectedEmplType.name==='PRINCIPAL'){
      this.user.userType = UserType.ACADAMIC;
    }else{
      this.user.userType = UserType.NON_ACADAMIC;
    }
    this.user.username = this.employee.firstName+this.employee.lastName.charAt(0);
    this.user.password='changeme';
    this.user.firstName=this.employee.firstName;
    this.user.fullName=this.employee.firstName+' '+this.employee.lastName;

    this.employee.profession=this.selectedEmplType.name;
    this.employee.gender=this.selectedOptionGender.name;
    this.employee.active=true;
    console.log(this.user);
    console.log('============================');
    console.log(this.employee);

    this.userService.create(this.user).subscribe((data) => {
      this.employee.fkUser=this.user=data;

      this.employeeservice.create(this.employee).subscribe(()=>{
        this.notifyService.showSuccess("Employee Created !!", "Success");
        this.userSubmitted = true;
      });
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

  validate(){

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

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

}

