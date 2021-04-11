import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportDTO } from 'src/app/dto/reportDTO';
import { Subject } from 'src/app/model/subject';
import { ReportResponseDTO } from 'src/app/dto/response/reportResponseDTO';
import { UserService } from 'src/app/service/user.service';
import { SubjectService } from 'src/app/service/subject.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/service/report.service';
import { ClassroomService } from 'src/app/service/classroom.service';
import { TeacherService } from 'src/app/service/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isTeacher } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";
import {SubjectResponseDTO} from "../../dto/response/subjectResponseDTO";
import {Report} from "../../model/report";

@Component({
  selector: 'app-create-report-classroom',
  templateUrl: './create-report-classroom.component.html',
  styleUrls: ['./create-report-classroom.component.scss']
})
export class CreateReportClassroomComponent implements OnInit {

  classroom_id: number;
  currentUser: any = {};
  isDataAvailable: boolean = false;
  isBasicSet: boolean = false;
  subjects: Observable<SubjectResponseDTO[]>;
  reports: Observable<ReportDTO>;
  report=new Report();
  raw_reports: ReportDTO[];
  response: ReportResponseDTO[];
  marks: any = {};
  year: any = {};
  semester: any = {};
  selectedSubject: any = {};

  constructor(private userService: UserService, private subjectService: SubjectService, private router: Router, private notifyService : NotificationService,
    private reportService: ReportService, private classroomService: ClassroomService, private teacherService: TeacherService,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.classroom_id = this.route.snapshot.params['id'];
      this.userService.getMyInfo().toPromise().then(data =>  {
        this.currentUser = data;
        this.teacherService.findByUserId(this.currentUser.id).subscribe(data => {
          this.subjectService.getSubjectsByTeacherId(data.id).subscribe(data => {
            this.subjects = data;
            console.log(this.subjects);
            this.isDataAvailable = true;
          });
        });
      });
    }


    setBasic() {
      this.reportService.makeReportFormToClassroom(this.classroom_id).subscribe(data => {
        this.reports = data;
        this.raw_reports = data;
        this.isBasicSet = true;
      });
    }

    onSubmit() {
      this.reportService.createReportsToClassroom(this.collect(this.marks, this.raw_reports, this.selectedSubject.id, this.year, this.semester))
      .subscribe(data =>  {
        this.refresh();
         this.notifyService.showSuccess('Reports created.', 'Ok');
      });
    }

    refresh() {
     this.response = [];
     this.marks = {};
     this.year = {};
     this.semester = {};
     this.selectedSubject = {};
    }

    collect(marks: number[], entities: ReportDTO[], subject_id: number,
      year: number, semester: number): ReportResponseDTO[] {
      var index = 0;
      var result: ReportResponseDTO[] = [];

      for(let entity of entities) {
        result.push(new ReportResponseDTO());

        if(marks[index] != null) {
          result[index].mark = marks[index];
          result[index].subject_id = subject_id;
          result[index].semester = semester;
          result[index].year = year;
          result[index].student_id = entity.student.id;
        } else {
          result[index].mark = 0;
        }
        index++;
      }
      return result;
    }

    goBack() {
      this.router.navigate(['classroom/all']);
    }

    userRole() {
      if(isTeacher(this.currentUser, this.router)) {
        return true;
      } else {
        this.router.navigate(['403']);
      }
    }
}
