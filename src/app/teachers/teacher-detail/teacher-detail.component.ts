import { Component, OnInit } from '@angular/core';
import {Student} from "../../model/student";
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentService} from "../../service/student.service";
import {isAdmin, isIdMatches, isTeacher} from "../../shared/roles";
import {TeacherService} from "../../service/teacher.service";
import {Teacher} from "../../model/teacher";
import {TeacherDTO} from "../../dto/TeacherDTO";

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent implements OnInit {

  currentUser: any = {};
  id: number = 0;
  teacher = new TeacherDTO();
  isDataAvailable:boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute,
              private teacherService: TeacherService, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.teacherService.findById(this.id).subscribe(data => {
        this.teacher = data;
        console.log(this.teacher);
        console.log(JSON.stringify(this.teacher));
        this.isDataAvailable = true;
      });
    });
  }
  back(){
    this.router.navigate(['teacher/all']);
  }
  // userRole(): boolean {
  //   if(isAdmin(this.currentUser, this.router) || isTeacher(this.currentUser, this.router) ||
  //     isIdMatches(this.currentUser, this.router, this.teacher.id, this.studentService)) {
  //     return true;
  //   } else {
  //     this.router.navigate(['403']);
  //   }
  // }

}
