import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from 'src/app/model/report';
import { UserService } from 'src/app/service/user.service';
import { StudentService } from 'src/app/service/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/service/report.service';
import { Student } from 'src/app/model/student';
import { TeacherService } from 'src/app/service/teacher.service';
import { Teacher } from 'src/app/model/teacher';
import { SubjectService } from 'src/app/service/subject.service';
import { Subject } from 'src/app/model/subject';
import { isTeacher, isIdMatches } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";
import {EnumValues} from "enum-values";
import {ExamType} from "../../enums/ExamType";
import {ExamDTO} from "../../dto/examDTO";
import {Exam} from "../../model/exam";
import {ReportDetail} from "../../model/reportDetail";
import {ReportTotal} from "../../model/reportTotal";

@Component({
  selector: 'app-semester-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss']
})
export class ReportViewComponent implements OnInit {

  student_id: number;
  currentUser: any = {};
  year: number;
  semester: any = {};
  isDataAvailable: boolean = false;
  selected: boolean = false;
  reports: Observable<Report[]>;
  reportfetail: Observable<ReportDetail[]>;
  student = new Student();
  teacher = new Teacher();
  subjects: Subject[];
  private examTypes: string[];
  etype: any;
  reportsummary:Observable<ReportTotal>;

  constructor(private userService: UserService, private studentService: StudentService, private teacherService: TeacherService,
              private notifyService : NotificationService,private router: Router, private route: ActivatedRoute, private reportService: ReportService, private subjectService: SubjectService) { }

  ngOnInit() {
    this.student_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.studentService.findById(this.student_id).subscribe(data => {
        this.student = data;
        this.examTypes = EnumValues.getNames(ExamType);
        this.isDataAvailable = true;
      });
    });
  }

  onSubmit() {
    if(this.etype) {
      console.log( this.etype);
     var exam=new Exam();
      exam.examType=this.etype;
      this.reportService.getResultByStudent(this.student_id, exam).subscribe(data => {
        this.reportsummary = data;
        this.reportfetail = data.reportlist;
        console.log( this.reportsummary);
        this.selected = true;
      });
    }else{
      this.notifyService.showWarning(null,'Please select the Term Type')
    }
  }
  getAvgByStudent(exam:Exam) {
    console.log(exam);
    if (exam) {
    this.reportService.getAvgBySubject(exam).subscribe(data => {
      console.log(data)
    }, error => {
      this.notifyService.showError(error, 'Error Occured');
    })
    }
  }

  goBack() {
    this.studentService.findById(this.student_id).subscribe(data => {
      this.router.navigate(['student/classroom/', data.classroom.id]);
    });
  }

  userRole() {
    if(isTeacher(this.currentUser, this.router) ||
    isIdMatches(this.currentUser, this.router, this.student_id, this.studentService)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

  update(report_id: number) {
    this.router.navigate(['report/update', report_id]);
  }

  delete(report_id: number) {
    this.reportService.delete(report_id).subscribe(() => {
      this.refresh();
    });
  }

  refresh(): void {
    window.location.reload();
  }

}
