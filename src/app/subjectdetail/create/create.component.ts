import { Component, OnInit } from '@angular/core';
import {SubjectResponseDTO} from "../../dto/response/subjectResponseDTO";
import {Observable} from "rxjs";
import {TeacherDTO} from "../../dto/TeacherDTO";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";
import {TeacherService} from "../../service/teacher.service";
import {SubjectService} from "../../service/subject.service";
import {isAdmin} from "../../shared/roles";
import {SubjectDetailDTO} from "../../dto/subjectDetailsDTO";
import {SubjectdetailService} from "../../service/subjectdetail.service";
import {Subject} from "../../model/subject";
import {ClassroomResponseDTO} from "../../dto/response/classroomResponseDTO";
import {Classroom} from "../../model/classroom";
import {ClassroomService} from "../../service/classroom.service";
import {EnumValues} from "enum-values";
import {ParentType} from "../../enums/parentType";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  subject = new SubjectResponseDTO();
  subjectdetail = new SubjectDetailDTO();
  currentUser: any = {};
  isDataAvailable: boolean  = false;
  teachers: Observable<TeacherDTO[]>;
  selectedteacher: any ;
  selectedsubject: any ;
  selectedclassroom: any ;
  subjects: Observable<SubjectResponseDTO[]>;
  classrooms: Observable<Classroom[]>;
  subjectsDetails: Observable<SubjectDetailDTO[]>;
  searchText: string;
  userSubmitted: boolean;

  constructor(private userService: UserService, private router: Router, private notifyService : NotificationService,private classroomService: ClassroomService,
              private teacherService: TeacherService, private subjectService: SubjectService,private  subjecteDetailservice:SubjectdetailService) {

  }

  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.teacherService.findAll().subscribe(data => {
        this.teachers = data;
        this.subjectService.findAll().subscribe(data => {
          this.subjects = data;
          this.classroomService.findAll().subscribe(data => {
            this.classrooms = data;
            this.isDataAvailable = true;
          });
        });
      });
    });
    this.loadSubjectDetails();
  }

  loadSubjectDetails(){
    this.subjecteDetailservice.findAll().subscribe(data=>{
      this.subjectsDetails=data;
    })
  }

  onSubmit() {
    if (this.validate()) {
    this.subjectdetail.fkClassroom = this.selectedclassroom;
    this.subjectdetail.fkSubject = this.selectedsubject;
    this.subjectdetail.fkTeacher = this.selectedteacher;
    this.subjectdetail.active = true;
    console.log(this.subjectdetail);
    this.subjecteDetailservice.create(this.subjectdetail).subscribe(() => {
      this.notifyService.showSuccess("SubjectDetail created.", "Success");
      this.reset();
      this.loadSubjectDetails();
    }, error => {
      this.notifyService.showError(error)
    });
    // this.refresh();
   }
  }

  validate(){
    var valid=true;
    if(!this.selectedsubject){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Subject ");
    }
    if(!this.selectedteacher){
      valid=false;
      this.notifyService.showWarning(null, "Please Select Teacher ");
    }
    if(!this.selectedclassroom){
      valid=false;
      this.notifyService.showWarning(null, "Please Select classroom ");
    }
    return valid;
  }

  reset() {
    this.subjectdetail = new SubjectDetailDTO();
    this.selectedteacher =undefined;
    this.selectedsubject=undefined;
    this.selectedclassroom=undefined;
  }

  refresh(): void {
    window.location.reload();
  }

  goBack() {
    this.router.navigate(['subject/all']);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

}
