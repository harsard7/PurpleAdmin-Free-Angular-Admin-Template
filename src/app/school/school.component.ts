import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UserService} from "../service/user.service";
import {NotificationService} from "../service/notification.service";
import {SchoolDTO} from "../dto/schoolDTO";
import {SchoolService} from "../service/school.service";
import {User} from "../model/user";
import {EmployeeDTO} from "../dto/EmployeeDTO";
import {EmployeeService} from "../service/employee.service";

@Component({
  selector: 'app-session',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  principals: Observable<EmployeeDTO[]>;
  school = new SchoolDTO();
  currentUser: any = {};
  submitted: boolean = false;
  isDataAvailable: boolean  = false;
  searchText: any;
  schools: Observable<SchoolDTO[]>;
  selectedprinciple: EmployeeDTO;
  constructor(private notifyService : NotificationService, private employeeservice: EmployeeService, private  sessionService :SchoolService, private userservice:UserService) { }

  ngOnInit() {
    this.userservice.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.loadList();
    });
    this.employeeservice.findAllPrincipals().subscribe(data => {
      this.principals=data;
      this.isDataAvailable = true;
    });
  }

  onSubmit() {
    //todo validation
    this.school.sesionType='ANNUAL';
    if(this.school.sessionStartdate) {
      this.school.createdBy = this.currentUser['username'];
      this.school.currentprincipal = this.selectedprinciple;
      this.sessionService.create(this.school).subscribe(() => {
        this.notifyService.showSuccess("School detail  Updated !!", "Success");
        this.submitted = true;
        this.loadList();
      }, error => {
        this.submitted = false;
        this.notifyService.showError(error,"Error Occured");
      });
    }else{
      this.notifyService.showWarning("Please select the Session Start date","Select date")
    }
  }
  loadList(){
    this.sessionService.findAll().subscribe(data => {
      this.schools=data;
      this.isDataAvailable = true;
    });
  }

}
