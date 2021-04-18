import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { StudentService } from 'src/app/service/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import { TeacherService } from 'src/app/service/teacher.service';
import { TimetableService} from "../../service/timetable.service";
import { Observable } from 'rxjs';
import { TimeTableEntity } from 'src/app/model/timeTableEntity';
import {ClassroomResponseDTO} from "../../dto/response/classroomResponseDTO";
import {EnumValues} from "enum-values";
import {DayOfWeek} from "../../enums/day-of-week";
import {TimeEnum} from "../../enums/time-enum";
import {TimeTableEntityResponseDTO} from "../../dto/response/timeTableEntityResponseDTO";
import {ClassroomService} from "../../service/classroom.service";
import {isAdmin} from "../../shared/roles";

@Component({
  selector: 'app-timetable-entity-view',
  templateUrl: './timetable-entity-view.component.html',
  styleUrls: ['./timetable-entity-view.component.scss']
})
export class TimetableEntityViewComponent implements OnInit {

  currentUser: any = {};
  id: number;
  isDataAvailable: boolean = false;
  // timetable: Observable<TimeTableEntity[]>;
  classrooms: Observable<ClassroomResponseDTO[]>;
  timetablesnml: TimeTableEntityResponseDTO[];
  days: string[];
  timetableHours: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,
    private studentService: StudentService, private teacherService: TeacherService,
    private timeTableService: TimetableService,private classroomService: ClassroomService) { }

  ngOnInit() {
    // this.id = this.route.snapshot.params['id'];
    // console.log(this.id);
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      var student = {};
      var teacher = {};
      this.days = EnumValues.getNames(DayOfWeek);
      this.timetableHours = EnumValues.getNamesAndValues(TimeEnum);
   if(this.userRole() == 'ROLE_ADMIN') {
        console.log('ROLE_ADMIN');
        this.classroomService.findAll().subscribe(data => {
          this.classrooms = data;
           this.timeTableService.findAll().subscribe(data=>{
          this.timetablesnml= data;
          this.isDataAvailable = true;
           });
        });
      }  else {
        this.isDataAvailable = true;
      }
    });
  }

  userRole(): string {
    return this.currentUser.authorities[0].authority + '';
  }
  itIsAdmin() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

  hasSignedIn() {
    return !!this.userService.currentUser;
  }
  getSubjectByClassAndDayAndTime(classid, day, time): TimeTableEntityResponseDTO {
    // console.log(this.timetablesnml);
    if (this.timetablesnml != null) {
      const enrs = this.timetablesnml.filter(enrs => (enrs.classroom.id === classid && enrs.dayOfWeek === day && enrs.time===time.name));
      if (enrs.length > 0) {
        return enrs[0];
      } else {
        return null;
      }
    }
    // return this.timeTableService.findByClassAndDayAndTime(classid,day,time);
  }

}
