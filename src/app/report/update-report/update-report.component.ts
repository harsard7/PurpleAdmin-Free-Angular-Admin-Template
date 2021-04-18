import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/model/report';
import { ReportResponseDTO } from 'src/app/dto/response/reportResponseDTO';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/model/subject';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/service/teacher.service';
import { ReportService } from 'src/app/service/report.service';
import { SubjectService } from 'src/app/service/subject.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from 'src/app/service/student.service';
import { isTeacher } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-update-report',
  templateUrl: './update-report.component.html',
  styleUrls: ['./update-report.component.scss']
})
export class UpdateReportComponent implements OnInit {

  report_id: number;
  currentUser: any = {};
  isDataAvailable: boolean  = false;
  report = new Report();
  response = new ReportResponseDTO();
  subjects: Observable<Subject[]>;
  selectedOption: any = {};
  semester: any = {};

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,
    private teacherService: TeacherService, private reportService: ReportService, private studentService: StudentService,
    private subjectService: SubjectService, private notifyService : NotificationService) { }

  ngOnInit() {
    this.report_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.teacherService.findByUserId(this.currentUser.id).subscribe(data => {
        this.subjectService.getSubjectsByTeacherId(data.id).subscribe(data => {
          this.subjects = data;
          this.reportService.findById(this.report_id).subscribe(data => {
            this.report = data;
            this.isDataAvailable = true;
          });
        });
      });
    });
  }


  isDataChanged() {
    if(!this.response.semester
      || !this.response.year
      || !this.response.mark) return true;
    return false;
  }

  onSubmit() {
    if(this.isDataChanged()) {
      this.response.student_id = this.report.student.id;
      if(!this.selectedOption) this.response.subject_id = this.selectedOption.subject.id;
      else this.response.subject_id = this.report.subject.id;
      if(this.semester) this.response.semester = Number(this.semester);
      // else this.response.semester = this.report.semester;
      if(!this.response.year) this.response.year = this.report.year;
      if(!this.response.mark) this.response.mark = this.report.mark;
      this.reportService.update(this.report.id, this.response).subscribe(() => {
        this.refresh();
         this.notifyService.showSuccess('Report updated.', 'Ok');
      }, error => {  this.notifyService.showError(error)});
    }
  }

  refresh() {
    this.reportService.findById(this.report_id).subscribe(data => {
      this.report = data;
    });
    this.response = new ReportResponseDTO();
    this.selectedOption = {};
    this.semester = {};
  }

  goBack() {
    this.studentService.findById(this.report.student.id).subscribe(data => {
      this.router.navigate(['student/classroom', data.id]);
    });
  }

  userRole() {
    if(isTeacher(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

}
