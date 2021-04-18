import { Component, OnInit } from '@angular/core';
import { AttendanceResponseDTO } from 'src/app/dto/response/attendanceResponseDTO';
import { Observable } from 'rxjs';
import { AttendanceDTO } from 'src/app/dto/AttendanceDTO';
import { AttendanceService} from "../../service/attendance.service";
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isTeacher } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";
import {ClassroomService} from "../../service/classroom.service";
import {Classroom} from "../../model/classroom";

@Component({
  selector: 'app-create-attendance',
  templateUrl: './create-attendance.component.html',
  styleUrls: ['./create-attendance.component.scss']
})
export class CreateAttendanceComponent implements OnInit {
  classroom = new Classroom();
  classroom_id: number;
  currentUser: any = {};
  isDataAvailable: boolean = false;
  isBasicSet: boolean = false;
  miss: boolean[] = [];
  lesson: any = {};
  dom: any = {};
  response: AttendanceResponseDTO[];
  attendances: Observable<AttendanceDTO[]>;
  raw_attendances: AttendanceDTO[];


  constructor(private userService: UserService, private router: Router, private notifyService : NotificationService,
    private attendanceService: AttendanceService,  private route: ActivatedRoute,private classroomService: ClassroomService) { }
  ngOnInit() {
    this.classroom_id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.isDataAvailable = true;
      this.classroomService.findById(this.classroom_id).subscribe(data =>  {
        this.classroom = data;
      });
    });
  }
  onSubmit() {
    this.attendanceService.create(this.collect(this.miss, this.raw_attendances,  this.dom)).subscribe(data => {
      this.notifyService.showSuccess("Attendance created.", "Success");

    }, error => {
      this.notifyService.showError(error);
    });
  }
  setBasic() {
    if(this.dom && this.dom && (Object.keys(this.dom).length > 0)) {
      console.log(this.dom);
      this.attendanceService.makeAttendanceFormToClassroom(this.classroom_id).subscribe(data => {
        this.attendances = data;
        this.raw_attendances = data;
        this.isBasicSet = true;
        this.notifyService.showSuccess('Form created', 'Ok');
      });
    }else{
      console.log('sdfsf');
      console.log(this.dom);
      this.notifyService.showWarning(null, "Please Select the Date of Miss");
    }
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }


  collect(misses: boolean[], entities: AttendanceDTO[],  dom: string) : AttendanceResponseDTO[] {
    var index = 0;
    var result: AttendanceResponseDTO[] = [];
    for(let entity of entities) {
      result.push(new AttendanceResponseDTO());
      if(misses[index]) result[index].miss = misses[index];
      else result[index].miss = false;
      result[index].dateOfMiss = dom;
      // result[index].lesson = lesson;
      result[index].student_id = entity.student.id;
      index++;
    }
    console.log(dom[0]);
    console.log(typeof dom[0]);
    console.log(JSON.stringify(result));
    return result;
  }

  goBack() {
    this.router.navigate(['classroom/all']);
  }

  userRole() {
    if(isTeacher(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

}
