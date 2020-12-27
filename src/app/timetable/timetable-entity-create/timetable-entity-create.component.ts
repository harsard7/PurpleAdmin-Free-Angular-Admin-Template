import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom } from 'src/app/model/classroom';
import { TimeTableEntityResponseDTO } from 'src/app/dto/response/timeTableEntityResponseDTO';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassroomService } from 'src/app/service/classroom.service';
import { TimetableService} from "../../service/timetable.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Room } from 'src/app/model/room';
import { RoomService } from 'src/app/service/room.service';
import { isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-timetable-entity-create',
  templateUrl: './timetable-entity-create.component.html',
  styleUrls: ['./timetable-entity-create.component.scss']
})
export class TimetableEntityCreateComponent implements OnInit {

  id: number;
  currentUser: any = {};
  isDataAvailable: boolean = false;
  selectedOptionClassroom: any = {};
  selectedOptionRoom: any = {};
  classrooms: Observable<Classroom[]>;
  rooms: Observable<Room[]>;
  timeTableEntity = new TimeTableEntityResponseDTO();

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private roomService: RoomService,
    private classroomService: ClassroomService, private timeTableService: TimetableService, private notifyService : NotificationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.classroomService.findAll().subscribe(data => {
        this.classrooms = data;
        this.roomService.findAll().subscribe(data => {
          this.rooms = data;
          this.isDataAvailable = true;
        });
      });
    });
  }



  reset() {
    this.timeTableEntity = new TimeTableEntityResponseDTO();
    this.isDataAvailable = false;
    this.selectedOptionClassroom = {};
  }

  onSubmit() {
    this.timeTableEntity.course_id = this.id;
    this.timeTableEntity.classroom_id = Number(this.selectedOptionClassroom.id);
    this.timeTableEntity.room_id = Number(this.selectedOptionRoom.id);
    this.timeTableService.create(this.id, this.timeTableEntity).subscribe(() => {
      this.reset();
       this.notifyService.showSuccess('Time table entity created.', 'Ok');
    }, error => { this.notifyService.showError("Failed ", "");});
  }

  goBack() {
    this.router.navigate(['timetable/course', this.id]);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }
}
