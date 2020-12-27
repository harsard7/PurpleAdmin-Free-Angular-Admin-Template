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

@Component({
  selector: 'app-classroom-create',
  templateUrl: './classroom-create.component.html',
  styleUrls: ['./classroom-create.component.scss']
})
export class ClassroomCreateComponent implements OnInit {

  classroom = new ClassroomResponseDTO();
  currentUser: any = {};
  isDataAvailable: boolean  = false;
  teachers: Observable<Teacher[]>;
  selectedOption: any = {};

  constructor(private userService: UserService, private router: Router,
    private teacherService: TeacherService, private classroomService: ClassroomService, private notifyService : NotificationService
   ) { }



  ngOnInit() {
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.teacherService.findAll().subscribe(data => {
        this.teachers = data;
        this.isDataAvailable = true;
      });
    });
  }

  onSubmit() {
    this.classroom.headTeacher_id = Number(this.selectedOption.id);
    this.classroomService.create(this.classroom).subscribe(() => {
      this.reset();
      this.notifyService.showSuccess("Classroom created.", "Success");
    }, error => {
      this.notifyService.showError("Failed ", "");
    });
  }

  reset() {
    this.classroom = new ClassroomResponseDTO();
    this.selectedOption = {};
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
