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
import {Student} from "../../model/student";
import {StudentResponseDTO} from "../../dto/response/studentResponseDTO";
import {EnumValues} from "enum-values";
import {ExamType} from "../../enums/ExamType";

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss']
})
export class CreateExamComponent implements OnInit {

  student_id: number;
  currentUser: any = {};
  etype: any;
  isDataAvailable: boolean  = false;
  exam = new ExamResponseDTO();
  subjects: Observable<Subject[]>;
  selectedOption: any;
  classroom = new Classroom();
  student = new StudentResponseDTO();
  TEST: any;
  TOPIC_TEST: any;
  REPETITION: any;
  HOMEWORK: any;
  examTypes: any;
  constructor(private userService: UserService, private router: Router, private examService: ExamService, private teacherService: TeacherService,
    private subjectService: SubjectService, private studentService: StudentService,private notifyService : NotificationService, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.student_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      console.log (this.currentUser);
      this.teacherService.findByUserId(this.currentUser.id).subscribe(data => {
        this.subjectService.getSubjectsByTeacherId(data.id).subscribe(data => {
          this.subjects = data;
          this.isDataAvailable = true;
          this.studentService.findById( this.student_id).subscribe(data=>{
           this. student=data;
            this.examTypes = EnumValues.getNames(ExamType);
          });
        });
      });
    });
  }

  onSubmit() {
    console.log("1");
   if(this.validate()){
    this.exam.student_id = this.student_id;
    this.exam.subject_id = this.selectedOption.id;
    this.exam.examType = this.etype;
     console.log(this.exam);
    this.examService.create(this.exam).subscribe(() => {
      console.log("done");
      this.notifyService.showSuccess("Exam created.", "Success");
      this.refresh();
    }, error => { console.log("not done");;this.notifyService.showError(error)});
    }
  }
  validate(){

    var valid=true;
    if(!this.selectedOption){
      valid=false;
      this.notifyService.showWarning(null, "Please select Subject");
    }
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
    this.exam = new ExamResponseDTO();
    this.selectedOption =undefined;
    this.etype =undefined;
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
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
}
