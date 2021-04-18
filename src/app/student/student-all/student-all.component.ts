import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Student} from "../../model/student";
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassroomService} from "../../service/classroom.service";
import {StudentService} from "../../service/student.service";
import {isAdmin, isTeacher} from "../../shared/roles";



@Component({
  selector: 'app-student-all',
  templateUrl: './student-all.component.html',
  styleUrls: ['./student-all.component.scss']
})
export class StudentAllComponent implements OnInit {

  classroom_id: number;

  isDataAvailable:boolean = false;
  currentUser: any = {};


  searchText;
  students: Observable<Student[]>;
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
    // this.classroom_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.studentService.findAll().subscribe(data =>  {
        console.log('111');
        this.collection.data=this.students = data;
        console.log('2');
        console.log(this.students);
        console.log('3');
        this.isDataAvailable = true;
        console.log('4');
        this.loadData();
        console.log('5');
      });

    });
  }


  loadData() {

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
    console.log(this.config,null,4);
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

  roleAdmin(){
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      return false;
    }
  }


  createStudent() {
    this.router.navigate(['student/create']);
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
