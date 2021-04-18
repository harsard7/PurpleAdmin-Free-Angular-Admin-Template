import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/service/classroom.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';
import { isStudent, isTeacher, isAdmin } from 'src/app/shared/roles';
import {ClassroomResponseDTO} from "../../dto/response/classroomResponseDTO";
import {StudentResponseDTO} from "../../dto/response/studentResponseDTO";

@Component({
  selector: 'app-student-classroom-list',
  templateUrl: './student-classroom-list.component.html',
  styleUrls: ['./student-classroom-list.component.scss']
})
export class StudentClassroomListComponent implements OnInit {

  classroom_id: number;
  searchText;
  students: Observable<StudentResponseDTO[]>;
  isDataAvailable:boolean = false;
  classroom:ClassroomResponseDTO;
  currentUser: any = {};
  // table
  config: any;
  collection = { count: 0, data: [] };
  public maxSize: number = 5;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '<',
    nextLabel: '>',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  constructor(private userService: UserService, private router: Router,
    private classroomService: ClassroomService, private route: ActivatedRoute,
    private studentService: StudentService) { }

  ngOnInit() {
    this.classroom_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.classroomService.getStudentsFromClassroom(this.classroom_id).subscribe(data =>
        this.collection.data=this.students = data);
    }).then(() => this.isDataAvailable = true);
    this.classroomService.findById(this.classroom_id).subscribe(data=>{
      this.classroom=data;
    });
  }
  loadData() {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }
  onPageChange(event){
    // console.log(event);
    this.config.currentPage = event;
  }
  userRole() {
    if(isAdmin(this.currentUser, this.router) || isTeacher(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

  details(user_id: number) {
    this.userService.getById(user_id).subscribe(data => {
      this.studentService.findByUserId(user_id).subscribe(data => this.router.navigate(['student/details', data.id]));
    });
  }

  update(user_id: number) {
    this.studentService.findByUserId(user_id).subscribe(data => this.router.navigate(['student/update', data.id]));
  }

  isHeadTeacher() {
    return this.currentUser.authorities[0].authority + '' == 'ROLE_HEADTEACHER';
  }

  summary(user_id: number) {
    this.studentService.findByUserId(user_id).subscribe(data => this.router.navigate(['student/summary', data.id]));
  }

  reports(student_id: number) {
    this.router.navigate(['report/student', student_id]);
  }

  attendances(student_id: number) {
    this.router.navigate(['attendance/student', student_id]);
  }

  exam(student_id: number) {
    this.router.navigate(['exam/list', student_id]);
  }

  report(student_id: number) {
    this.router.navigate(['report/create', student_id]);
  }

  remark(student_id: number) {
    this.router.navigate(['remark', student_id]);
  }
}
