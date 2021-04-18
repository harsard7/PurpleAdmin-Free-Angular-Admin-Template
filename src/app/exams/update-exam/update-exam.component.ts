import { Component, OnInit } from '@angular/core';
import { ExamResponseDTO } from 'src/app/dto/response/examResponseDTO';
import { Exam } from 'src/app/model/exam';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/service/exam.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isStudent, isTeacher, isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";
import {EnumValues} from "enum-values";
import {ExamType} from "../../enums/ExamType";

@Component({
  selector: 'app-update-exam',
  templateUrl: './update-exam.component.html',
  styleUrls: ['./update-exam.component.scss']
})
export class UpdateExamComponent implements OnInit {
  exam_id: number;
  currentUser: any = {};
  etype: any;
  isDataAvailable: boolean  = false;
  response = new ExamResponseDTO();
  exam = new Exam();
  examTypes: any;
  constructor(private userService: UserService, private router: Router,
    private examService: ExamService, private route: ActivatedRoute, private notifyService : NotificationService) { }

  ngOnInit() {
    this.exam_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.examService.findById(this.exam_id).subscribe(data => {
        this.exam = data;
        this.isDataAvailable = true;
        this.examTypes = EnumValues.getNames(ExamType);
        this.etype= this.exam.examType;
      });
    });
  }


  isDataChanged() {
    if(!this.response.mark
      || !this.response.written_at
      || !this.etype) return true;
    return false;
  }

  onSubmit() {
    if(this.isDataChanged) {
      if (this.validate()) {
      this.response.subject_id = this.exam.subject.id;
      this.response.student_id = this.exam.student.id;
        this.response.examType=  this.etype;
      if (!this.etype) this.response.examType = this.etype;
      // else this.response.examType = this.exam.examType;
      if (!this.response.mark) this.response.mark = this.exam.mark;
      if (!this.response.written_at) this.response.written_at = this.exam.written_at;
      console.log(this.response);
      this.examService.update(this.exam_id, this.response).subscribe(() => {
        this.refresh();
        this.notifyService.showSuccess('Exams updated.', 'Ok');
      }, error => {
        this.notifyService.showError(error)
      });
      }
    }
  }
  validate(){
    var valid=true;
    if(!this.etype){
      valid=false;
      this.notifyService.showWarning(null, "Please select Exam Type");
    }
    if(!this.exam.mark || this.exam.mark <0 || this.exam.mark >100){
      valid=false;
      this.notifyService.showWarning(null, "Please enter valid exam mark");
    }
    if(!this.exam.written_at){
      valid=false;
      this.notifyService.showWarning(null, "Please select Exam written Date");
    }
    return valid;
  }


  refresh() {
    this.examService.findById(this.exam_id).subscribe(data => {
      this.exam = data;
    });
    this.response = new ExamResponseDTO();
  }

  goBack() {
    this.router.navigate(['exam/list', this.exam.student.id]);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router) || isTeacher(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
}
