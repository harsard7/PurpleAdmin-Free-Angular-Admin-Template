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
  studentspage: Student[];
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
  //serverpagination
  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  firstname = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private userService: UserService, private router: Router,
              private classroomService: ClassroomService, private route: ActivatedRoute,
              private studentService: StudentService) { }

  ngOnInit() {
    // this.classroom_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.retrieveStudents();
      // this.studentService.findAll().subscribe(data =>  {
      //   this.collection.data=this.students = data;
      //   this.isDataAvailable = true;
      //   this.loadData();
      // });

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
    this.router.navigate(['report/student/', student_id]);
  }

  remark(student_id: number) {
    this.router.navigate(['remark', student_id]);
  }

  getRequestParams(searchfirstname, page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchfirstname) {
      params[`firstname`] = searchfirstname;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }
  retrieveStudents() {
    const params = this.getRequestParams(this.firstname, this.page, this.pageSize);

    this.studentService.getAll(params).subscribe(
        response => {
          const { students, totalItems } = response;
          this.studentspage = students;
          this.count = totalItems;
          this.isDataAvailable = true;
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event) {
    this.page = event;
    this.retrieveStudents();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveStudents();
  }

  setActiveTutorial(tutorial, index) {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }


}
