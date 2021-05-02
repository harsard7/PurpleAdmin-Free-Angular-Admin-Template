import {Component, OnInit, PipeTransform} from '@angular/core';
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
   // schools: Observable<SchoolDTO[]>;
  // schools:SchoolDTO[];
  selectedprinciple: EmployeeDTO;

  searchTerm: string;
  page = 1;
  pageSize = 4;
  collectionSize: number;
  currentRate = 8;
  schools: SchoolDTO[];
  allschools: SchoolDTO[];

  constructor(private notifyService : NotificationService, private employeeservice: EmployeeService, private  sessionService :SchoolService, private userservice:UserService) {

  }

  ngOnInit() {
    this.userservice.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
       this.loadList();
    });
    this.employeeservice.findAllPrincipals().subscribe(data => {
      this.principals=data;
      this.school.censusNo="17670";
      this.school.address="MEDDEKETIYA ALAHITIYA";
      this.isDataAvailable = true;
    });
  }

  onSubmit() {
    //todo validation
    if(this.validation()) {
      this.school.sesionType = 'ANNUAL';
      if (this.school.sessionStartdate) {
        this.school.createdBy = this.currentUser['username'];
        this.school.currentprincipal = this.selectedprinciple;
        this.sessionService.create(this.school).subscribe(() => {
          this.notifyService.showSuccess("School detail  Updated !!", "Success");
          this.submitted = true;
          this.loadList();
        }, error => {
          this.submitted = false;
          this.notifyService.showError(error, "Error Occured");
        });
      } else {
        this.notifyService.showWarning("Please select the Session Start date", "Select date")
      }
    }
  }

  validation(){
    var valid=true;
    if(!this.school.sessionStartdate){
      valid=false;
        this.notifyService.showWarning(null,'Please select School start')
    }
    if(!this.school.censusNo){
      valid=false;
      this.notifyService.showWarning(null,'Please enter the census no')
    }
    if(!this.selectedprinciple){
      valid=false;
      this.notifyService.showWarning(null,'Please select Current principal')
    }
    return valid;
  }
  loadList(){
    this.sessionService.findAll().subscribe(data => {
      this.isDataAvailable = true;
      this.collectionSize = data.length;
      this.schools = data;
      this.allschools = this.schools;
    });
  }

  search(value: string): void {
    this.schools = this.allschools.filter((val) => val.createdBy.toLowerCase().includes(value)||val.address.toLowerCase().includes(value));
    this.collectionSize = this.schools.length;
  }

}
