import { Component, OnInit } from '@angular/core';
import { ExamResponseDTO } from 'src/app/dto/response/examResponseDTO';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/service/exam.service';
import { SubjectService } from 'src/app/service/subject.service';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/model/subject';
import { StudentService } from 'src/app/service/student.service';
import { Classroom } from 'src/app/model/classroom';
import { TeacherService } from 'src/app/service/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isStudent, isTeacher, isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss']
})
export class CreateExamComponent implements OnInit {

  student_id: number;
  currentUser: any = {};
  etype: any = {};
  isDataAvailable: boolean  = false;
  exam = new ExamResponseDTO();
  subjects: Observable<Subject[]>;
  selectedOption: any = {};
  classroom = new Classroom();
  TEST: any;
  TOPIC_TEST: any;
  REPETITION: any;
  HOMEWORK: any;

  constructor(private userService: UserService, private router: Router, private examService: ExamService, private teacherService: TeacherService,
    private subjectService: SubjectService, private studentService: StudentService,private notifyService : NotificationService, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.student_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.teacherService.findByUserId(2).subscribe(data => {
        this.subjectService.getSubjectsByTeacherId(data.id).subscribe(data => {
          this.subjects = data;
          this.isDataAvailable = true;
        });
      });
    });
  }

  onSubmit() {
    this.exam.student_id = this.student_id;
    this.exam.subject_id = this.selectedOption.id;
    this.exam.examType = this.etype;
    this.examService.create(this.exam).subscribe(() => {
      this.refresh();
      this.notifyService.showSuccess("Exam created.", "Success");
    }, error => {this.notifyService.showError(error)});
  }

  refresh() {
    this.exam = new ExamResponseDTO();
    this.selectedOption = {};
  }

  goBack() {
    this.studentService.findById(this.student_id).subscribe(data => {
      this.router.navigate(['student/classroom', data.classroom.id]);
    });
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router) || isTeacher(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }
}
