import { Component, OnInit } from '@angular/core';
import { ReportResponseDTO } from 'src/app/dto/response/reportResponseDTO';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/model/subject';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/service/teacher.service';
import { ReportService } from 'src/app/service/report.service';
import { SubjectService } from 'src/app/service/subject.service';
import { StudentService } from 'src/app/service/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isTeacher } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";
import {EnumValues} from "enum-values";
import {ExamType} from "../../enums/ExamType";

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {

  student_id: number;
  currentUser: any = {};
  isDataAvailable: boolean  = false;
  report = new ReportResponseDTO();
  subjects: Observable<Subject[]>;
  selectedOption: any = {};
  semester: any = {};
  private examTypes: string[];
  etype: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,
    private teacherService: TeacherService, private reportService: ReportService,
    private subjectService: SubjectService, private studentService: StudentService, private notifyService : NotificationService) { }

  ngOnInit() {
    this.student_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.teacherService.findByUserId(this.currentUser.id).subscribe(data => {
        this.subjectService.getSubjectsByTeacherId(data.id).subscribe(data => {
          this.subjects = data;
          this.examTypes = EnumValues.getNames(ExamType);
          this.isDataAvailable = true;
        });
      });
    });
  }



  onSubmit() {
    this.report.student_id = this.student_id;
    if(this.etype) {
      this.report.semester = this.semester;
      this.report.subject_id = this.selectedOption.id;
      console.log(this.etype);
      this.reportService.createTermReport(this.etype).subscribe(() => {
         this.notifyService.showSuccess('Report created.', 'Ok');
        this.refresh();
      }, error => {  this.notifyService.showSuccess('Failed', 'Ok');});
    }else{
      this.notifyService.showWarning(null,'Please select the Term Type')
    }
  }

  refresh() {
    this.report = new ReportResponseDTO();
    this.selectedOption = {};
    this.semester = {};
  }

  goBack() {
    this.studentService.findById(this.student_id).subscribe(data => {
      this.router.navigate(['student/classroom', data.classroom.id]);
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
