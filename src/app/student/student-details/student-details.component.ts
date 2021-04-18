import { Component, OnInit, OnDestroy } from '@angular/core';
import { Student } from 'src/app/model/student';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';
import { isTeacher, isAdmin, isIdMatches } from 'src/app/shared/roles';
import {StudentResponseDTO} from "../../dto/response/studentResponseDTO";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  currentUser: any = {};
  id: number = 0;
  student = new StudentResponseDTO();
  isDataAvailable:boolean = false;
  searchText: any;

  constructor(private userService: UserService, private route: ActivatedRoute,
    private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.studentService.findById(this.id).subscribe(data => {
        this.student = data;
        console.log(this.student);
        this.isDataAvailable = true;
      });
    });
  }

  userRole(): boolean {
    if(isAdmin(this.currentUser, this.router) || isTeacher(this.currentUser, this.router) ||
    isIdMatches(this.currentUser, this.router, this.student.id, this.studentService)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }
  backToStudentList(){
    this.router.navigate(['student/all']);
  }
  update(){
    this.router.navigate(['student/update', this.id]);
  }
}
