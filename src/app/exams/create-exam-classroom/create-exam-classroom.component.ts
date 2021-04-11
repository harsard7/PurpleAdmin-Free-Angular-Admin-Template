import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/model/subject';
import { ExamDTO } from 'src/app/dto/examDTO';
import { ExamResponseDTO } from 'src/app/dto/response/examResponseDTO';
import { UserService } from 'src/app/service/user.service';
import { SubjectService } from 'src/app/service/subject.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/service/exam.service';
import { TeacherService } from 'src/app/service/teacher.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isTeacher } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";
import {ClassroomService} from "../../service/classroom.service";
import {Classroom} from "../../model/classroom";

@Component({
  selector: 'app-create-exam-classroom',
  templateUrl: './create-exam-classroom.component.html',
  styleUrls: ['./create-exam-classroom.component.scss']
})
export class CreateExamClassroomComponent implements OnInit {

  classroom=new Classroom();
  classroom_id: number;
  currentUser: any = {};
  etype: any = {};
  isDataAvailable: boolean = false;
  isBasicSet: boolean = false;
  subjects: Observable<Subject[]>;
  exams: Observable<ExamDTO[]>;
  raw_exams: ExamDTO[];
  response: ExamResponseDTO[];
  marks: any = {};
  written_at: any = {};
  selectedSubject: any = {};
  TEST: any;
  TOPIC_TEST: any;
  REPETITION: any;
  HOMEWORK: any;

  constructor(private userService: UserService, private subjectService: SubjectService, private router: Router,
    private examService: ExamService, private teacherService: TeacherService, private route: ActivatedRoute,private notifyService : NotificationService,private classroomService: ClassroomService) { }

  ngOnInit() {
    console.log("1");
    this.classroom_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      console.log("2");
      this.teacherService.findByUserId(this.currentUser.id).subscribe(data => {
        console.log("3");
        this.subjectService.getSubjectsByTeacherId(data.id).subscribe(data => {
          this.subjects = data;
          console.log("4");
          this.isDataAvailable = true;
          this.classroomService.findById( this.classroom_id).subscribe(data=>{
            this.classroom=data;
            console.log("5");
          });
        });
      });
    });
  }


  setBasic() {
    console.log( this.etype);
    this.examService.makeExamsFormToClassroom(this.classroom_id, this.written_at, this.etype).subscribe(data => {
      this.exams = data;
      this.raw_exams = data;
      console.log(this.exams);
      this.isBasicSet = true;
    });
  }

  onSubmit() {
    this.examService.createExamsFromForm(this.collect(this.marks, this.raw_exams, this.selectedSubject.id, this.written_at, this.etype))
    .subscribe(data =>  {
      this.refresh();
       this.notifyService.showSuccess('Exams created', 'Ok');
    }, error => { this.notifyService.showError(error)});
  }

  refresh() {
    this.response = [];
    this.isBasicSet = false;
    this.marks = {};
    this.written_at = {};
    this.selectedSubject= {};
  }

  collect(marks: number[], entities: ExamDTO[], subject_id: number, written_at: string, etype: string): ExamResponseDTO[] {
    var index = 0;
    var result: ExamResponseDTO[] = [];

    for(let entity of entities) {
      result.push(new ExamResponseDTO());
      result[index].subject_id = subject_id;
      result[index].student_id = entity.student.id;
      result[index].examType = etype;
      result[index].written_at = written_at;
      if(marks[index] != null) {
        result[index].mark = marks[index];
      } else {
        result[index].mark = 0;
      }
      index++;
    }
    console.log(result);
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
