import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/model/exam';
import { Subject } from 'src/app/model/subject';
import { UserService } from 'src/app/service/user.service';
import { SubjectService } from 'src/app/service/subject.service';
import { ExamService } from 'src/app/service/exam.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/service/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isStudent, isTeacher, isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";
import {StudentService} from "../../service/student.service";
import {StudentResponseDTO} from "../../dto/response/studentResponseDTO";

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit {
  searchText;
  student = new StudentResponseDTO();
  student_id: number;
  currentUser: any = {};
  exams: Observable<Exam[]>;
  subjects: Observable<Subject[]>;
  selected: boolean = false;
  isDataAvailable: boolean = false;
  selectedOption: any;

  constructor(private userService: UserService, private subjectService: SubjectService, private teacherService: TeacherService,
    private examService: ExamService, private router: Router, private route: ActivatedRoute, private notifyService : NotificationService,private studentserveice : StudentService) { }

  ngOnInit() {
    this.student_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.teacherService.findByUserId(this.currentUser.id).subscribe(data => {
        this.subjectService.getSubjectsByTeacherId(data.id).subscribe(data => {
          this.subjects = data;
          this.isDataAvailable = true;
          this.studentserveice.findById(this.student_id).subscribe(data=>{this.student=data  });
        });
      });
    });
  }



  create() {
    this.router.navigate(['exam/create', this.student_id]);
  }

  onSubmit() {
    if(this.selectedOption) {
      this.examService.findAllByStudent(this.student_id, this.selectedOption.id).subscribe(data => {
        this.exams = data;
        console.log(data);
        this.selected = true;
      });
    }else{
      this.notifyService.showWarning(null, 'Please select Subject');
    }
  }


  update(exam_id: number) {
    this.router.navigate(['exam/update/', exam_id]);
  }

  delete(exam_id: number) {
    this.examService.delete(exam_id).subscribe(() => {
      this.refresh();
       this.notifyService.showSuccess('Exam deleted.', 'Ok');
    }, error => {  this.notifyService.showError(error)});
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router) || isTeacher(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

  refresh(): void {
    window.location.reload();
  }
}
