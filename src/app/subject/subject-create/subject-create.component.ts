import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/service/subject.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/service/teacher.service';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';
import { SubjectResponseDTO } from 'src/app/dto/response/subjectResponseDTO';
import { isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";
import {TeacherDTO} from "../../dto/TeacherDTO";
import {TimeTableEntityResponseDTO} from "../../dto/response/timeTableEntityResponseDTO";
import {TimetableService} from "../../service/timetable.service";

@Component({
  selector: 'app-subject-create',
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.scss']
})
export class SubjectCreateComponent implements OnInit {

  subject = new SubjectResponseDTO();
  currentUser: any = {};
  isDataAvailable: boolean  = false;
  teachers: Observable<TeacherDTO[]>;
  selectedOption: any = {};
  subtype: any;
  Mandotory: any;
  Optional: any;

  constructor(private userService: UserService, private router: Router, private notifyService : NotificationService,
    private teacherService: TeacherService, private subjectService: SubjectService) {

  }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.teacherService.findAll().subscribe(data => {
        this.teachers = data;
        this.isDataAvailable = true;
      });
    });
  }

  onSubmit() {
    console.log("dasd");
    if(this.validation()) {
      // this.subject.teacher_id = Number(this.selectedOption.id);
      this.subject.subjectType = this.subtype;
      this.subjectService.create(this.subject).subscribe(() => {
        this.notifyService.showSuccess("Subject created.", "Success");
        this.reset();
      }, error => {
        this.notifyService.showError(error)
      });
      // this.refresh();
    }
  }
  validation(){
    console.log("dasddfdfdf");
    var valid=true;
    if(!this.subject.title){
      valid=false;
      this.notifyService.showWarning(null,'Please select subject name')
    }
    if(!this.subtype){
      valid=false;
      this.notifyService.showWarning(null,'Please select Subject type')
    }
    return valid;
  }
  reset() {
    this.subject = new SubjectResponseDTO();
    this.subtype = undefined;
  }

  refresh(): void {
    window.location.reload();
  }

  goBack() {
    this.router.navigate(['subject/all']);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

  goSubjectMapping() {
    this.router.navigate(['subjectdetail/create']);
  }
}
