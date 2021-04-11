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
import {EnumValues} from "enum-values";
import {DayOfWeek} from "../../enums/day-of-week";
import {TimeEnum} from "../../enums/time-enum";
import {SubjectdetailService} from "../../service/subjectdetail.service";
import {SubjectDetailDTO} from "../../dto/subjectDetailsDTO";
import {ClassroomResponseDTO} from "../../dto/response/classroomResponseDTO";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-timetable-entity-create',
  templateUrl: './timetable-entity-create.component.html',
  styleUrls: ['./timetable-entity-create.component.scss']
})
export class TimetableEntityCreateComponent implements OnInit {

  id: number;
  currentUser: any = {};
  isDataAvailable: boolean = false;
  selectedOptionClassroom :ClassroomResponseDTO;
  selectedsubjectDetail: any = {};
  selectedOptionTime: any = {};
  selectedOptionDay: any = {};
  classrooms: Observable<ClassroomResponseDTO[]>;
  timetables: Observable<TimeTableEntityResponseDTO[]>;
  timetablesnml: TimeTableEntityResponseDTO[];
  rooms: Observable<Room[]>;
  timeTableEntity = new TimeTableEntityResponseDTO();
  days: string[];
  timetableHours: any;
  subjectsDetails: Observable<SubjectDetailDTO[]>;
  searchText: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private roomService: RoomService,
    private classroomService: ClassroomService, private timeTableService: TimetableService, private notifyService : NotificationService,private  subjecteDetailservice:SubjectdetailService) { }

  ngOnInit() {
    // this.id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.classroomService.findAll().subscribe(data => {
        this.classrooms = data;
        this.roomService.findAll().subscribe(data => {
          this.rooms = data;
          this.isDataAvailable = true;
          this.days = EnumValues.getNames(DayOfWeek);
          this.timetableHours = EnumValues.getNamesAndValues(TimeEnum);
          this.loadTimeTable();
        });
      });
    });
  }

  loadTimeTable(){
    this.timeTableService.findAll().subscribe(data=>{
      this.timetables=data;
      this.timetablesnml=data;
    })
  }


  reset() {
    this.timeTableEntity = new TimeTableEntityResponseDTO();
    this.isDataAvailable = false;
    // this.selectedOptionClassroom = {};
  }

  onSubmit() {
    this.timeTableEntity.classroom=this.selectedOptionClassroom;
    this.timeTableEntity.subjectDetails=this.selectedsubjectDetail;
    this.timeTableEntity.dayOfWeek=this.selectedOptionDay;
    this.timeTableEntity.time=this.selectedOptionTime.name;
    this.timeTableService.create(this.timeTableEntity).subscribe(() => {
      this.loadTimeTable();
       this.notifyService.showSuccess('Time table entity created.', 'Ok');
      this.reset();
    }, error => { this.notifyService.showError(error)});
  }

  goBack() {
    this.router.navigate(['timetable/subject', this.id]);
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

  loadSubdetails(selectedclassid:any) {
      console.log(selectedclassid);
    this.subjecteDetailservice.findByClassId(selectedclassid.id).subscribe(data=>{
      this.subjectsDetails=data;
    });
  }

  getSubjectByClassAndDayAndTime(classid, day, time): TimeTableEntityResponseDTO {
    // console.log(this.timetablesnml);
    if (this.timetablesnml != null) {
        const enrs = this.timetablesnml.filter(enrs => (enrs.classroom.id === classid && enrs.dayOfWeek === day && enrs.time===time.name));
        if (enrs.length > 0) {
          console.log(enrs[0]);
        return enrs[0];
      } else {
        return null;
      }
    }
    // return this.timeTableService.findByClassAndDayAndTime(classid,day,time);
  }
}
