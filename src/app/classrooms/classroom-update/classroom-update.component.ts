import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/service/classroom.service';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';
import { UserService } from 'src/app/service/user.service';
import { TeacherService } from 'src/app/service/teacher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Classroom } from 'src/app/model/classroom';
import { ClassroomResponseDTO } from 'src/app/dto/response/classroomResponseDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";
import {map} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-classroom-update',
  templateUrl: './classroom-update.component.html',
  styleUrls: ['./classroom-update.component.scss']
})
export class ClassroomUpdateComponent implements OnInit {

  sections=['A','B','C','D'];
  currentUser: any = {};
  isDataAvailable: boolean = false;
  id: number;
  teachers: Observable<Teacher[]>;
  classroom = new Classroom();
  response = new ClassroomResponseDTO();
    section: any;
    selected:number;


  constructor(private userService: UserService, private teacherService: TeacherService, private notifyService : NotificationService,
    private router: Router, private route: ActivatedRoute, private classroomService: ClassroomService,private fb: FormBuilder) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.classroomService.findById(this.id).subscribe(data =>  {
        this.classroom = data;
        this.section=this.classroom.letter;
        this.teacherService.findAll().subscribe(data => {
          this.teachers = data;
          this.isDataAvailable = true;
          this.selected=this.classroom.headTeacher.id;
        });
      });
    });
  }


  isDataChanged() {
    if(!this.response.end_year
      || !this.response.headTeacher_id
      || !this.response.letter
      || !this.response.start_year
      || this.response.year) return true;
    return false;
  }

  onSubmit() {
    if(this.isDataChanged) {
      console.log(this.section);
      console.log(this.classroom);
      this.response.headTeacher_id = Number(this.selected);
      if(!this.response.headTeacher_id) this.response.headTeacher_id =this.selected;
      if(!this.response.letter) this.response.letter = this.section;
      if(!this.response.year) this.response.year = this.classroom.year;
      console.log(this.response);
      this.classroomService.update(this.id, this.response).subscribe(() => {
        this.refresh();
        this.notifyService.showSuccess("Classroom updated.", "Success");
      }, error => { this.notifyService.showError(error)});
    }
  }

  refresh() {
    this.response = new ClassroomResponseDTO();
    this.section = {};
    this.selected=0;
    this.classroomService.findById(this.id).subscribe(data =>  {
      this.classroom = data;
    });
  }

  goBack() {
    this.router.navigate(['classroom/all']);
  }

  isHeadTeacher() {
    return this.currentUser.authorities[0].authority + '' == 'ROLE_HEADTEACHER';
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router) || this.isHeadTeacher()) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }
}
