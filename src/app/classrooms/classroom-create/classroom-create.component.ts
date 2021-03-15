import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/service/teacher.service';
import { ClassroomService } from 'src/app/service/classroom.service';
import { ClassroomResponseDTO } from 'src/app/dto/response/classroomResponseDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";
import {TeacherDTO} from "../../dto/TeacherDTO";

@Component({
  selector: 'app-classroom-create',
  templateUrl: './classroom-create.component.html',
  styleUrls: ['./classroom-create.component.scss']
})
export class ClassroomCreateComponent implements OnInit {
  sections=['A','B','C','D'];
  classroom = new ClassroomResponseDTO();
  currentUser: any = {};
  isDataAvailable: boolean  = false;
  teachers: Observable<TeacherDTO[]>;
  section: any;
  selectedteacher:Teacher;

  constructor(private userService: UserService, private router: Router,
    private teacherService: TeacherService, private classroomService: ClassroomService, private notifyService : NotificationService
   ) { }



  ngOnInit() {
    console.log('onSubmit');
    this.userService.getMyInfo().toPromise().then(data =>  {
      console.log('onSubmit 1');
      this.currentUser = data;
      this.teacherService.findAll().subscribe(data => {
        console.log('onSubmit 2');
        this.teachers = data;
        console.log(this.teachers);
        this.isDataAvailable = true;
      });
    });
    console.log('onSubmit 3');
  }

  onSubmit() {
    // this.classroom.headTeacher_id = Number(this.selectedteacher);
console.log('onSubmit');
    this.classroom.letter = this.section;
    this.classroom.headTeacher = this.selectedteacher;
    this.classroomService.create(this.classroom).subscribe(() => {
      this.notifyService.showSuccess("Classroom created.", "Success");
      this.reset();
    }, error => {
      this.notifyService.showError(error);
    });
  }

  reset() {
    this.classroom = new ClassroomResponseDTO();
    this.selectedteacher =new Teacher();
    this.section = {};
  }


  goBack() {
    this.router.navigate(['classroom/all']);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

}
