import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

import { TeacherService } from 'src/app/service/teacher.service';
import { TeacherPreference } from 'src/app/model/teacherPreference';
import {SubjectService} from "../../service/subject.service";
import {Subject} from "../../model/subject";

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent implements OnInit {

  currentUser: any = {};
  id: number = 0;
  subject = new Subject();
  isDataAvailable:boolean = false;
  preference = new TeacherPreference();

  constructor(private userService: UserService, private route: ActivatedRoute,
    private subjectService: SubjectService, private router: Router, private teacherService: TeacherService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.subjectService.findById(this.id).subscribe(data => {
        this.subject = data;
        this.teacherService.getAllTeacherPreferences(this.subject.fkTeacher.id).subscribe(data => {
          this.preference = data;
          this.isDataAvailable = true;
        });
      });
    });
  }

  goBack() {
    this.router.navigate(['subject/all']);
  }

  hasSignedId() {
    return !!this.userService.currentUser;
  }
}
