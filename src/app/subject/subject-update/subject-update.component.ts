import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { TeacherService } from 'src/app/service/teacher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubjectService } from 'src/app/service/subject.service';
import { Subject } from 'src/app/model/subject';

import { Observable } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";
import {SubjectResponseDTO} from "../../dto/response/subjectResponseDTO";

@Component({
  selector: 'app-subject-update',
  templateUrl: './subject-update.component.html',
  styleUrls: ['./subject-update.component.scss']
})
export class SubjectUpdateComponent implements OnInit {

  currentUser: any = {};
  isDataAvailable: boolean = false;
  subject_id: number;
  teachers: Observable<Teacher[]>;
  subject = new SubjectResponseDTO();
  response = new SubjectResponseDTO();
  selectedOption: any = {};
  subtype: any;
  constructor(private userService: UserService, private teacherService: TeacherService,private notifyService : NotificationService,
    private router: Router, private route: ActivatedRoute, private subjectService: SubjectService) { }

  ngOnInit() {
    this.subject_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.subjectService.findById(this.subject_id).subscribe(data => {
        this.subject = data;
        this.subtype=this.subject.subjectType;
        this.teacherService.findAll().subscribe(data => {
          this.teachers = data;
          this.isDataAvailable = true;
        });
      });
    });
  }

  isDataChanged() {
    if(!this.response.title
      || !this.response.year
      || !this.response.teacher_id) return true;
    return false;
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
  onSubmit() {
    if(this.validation()) {
      // this.subject.teacher_id = Number(this.selectedOption.id);
      this.subject.subjectType = this.subtype;
      this.subjectService.update(this.subject.id,this.subject).subscribe(() => {
        this.notifyService.showSuccess("Subject updated.", "Success");
        this.router.navigate(['subject/all']);
      }, error => {
        this.notifyService.showError(error)
      });
      // this.refresh();
    }
  }


  // onSubmit() {
  //   if(this.isDataChanged) {
  //     // if(!this.selectedOption) this.response.teacher_id = this.subject.fkTeacher.id;
  //     else this.response.teacher_id = Number(this.selectedOption.id);
  //     if(!this.response.title) this.response.title = this.subject.title;
  //     if(!this.response.year) this.response.year = this.subject.year;
  //     this.subjectService.update(this.subject_id, this.response).subscribe(() => {
  //       this.notifyService.showSuccess("Subject updated.", "Success");
  //       this.refresh();
  //     });
  //   }
  // }

  refresh() {
    this.subjectService.findById(this.subject_id).subscribe(data => {
      this.subject = data;
    });
    this.response = new SubjectResponseDTO();
    this.selectedOption = {};
  }

  goBack() {
    this.router.navigate(['subject/all']);
  }

  userRole() {
    return isAdmin(this.currentUser, this.router);
  }

}
