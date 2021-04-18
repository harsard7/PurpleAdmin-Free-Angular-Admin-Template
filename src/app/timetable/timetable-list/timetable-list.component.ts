import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { SubjectService } from 'src/app/service/subject.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TimeTableEntity } from 'src/app/model/timeTableEntity';
import { Subject } from 'src/app/model/subject';
import { TimetableService} from "../../service/timetable.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { isAdmin } from 'src/app/shared/roles';
import {NotificationService} from "../../service/notification.service";
import {TimeTableEntityResponseDTO} from "../../dto/response/timeTableEntityResponseDTO";
import {EnumValues} from "enum-values";
import {DayOfWeek} from "../../enums/day-of-week";
import {TimeEnum} from "../../enums/time-enum";
import {ClassroomResponseDTO} from "../../dto/response/classroomResponseDTO";
import {SubjectdetailService} from "../../service/subjectdetail.service";
import {SubjectDetailDTO} from "../../dto/subjectDetailsDTO";

@Component({
  selector: 'app-timetable-list',
  templateUrl: './timetable-list.component.html',
  styleUrls: ['./timetable-list.component.scss']
})
export class TimetableListComponent implements OnInit {
  searchText;
  subject_detail_id: number;
  currentUser: any = {};
  subject = new Subject();
  subjectdetail = new SubjectDetailDTO();
  isDataAvailable: boolean = false;
  timeTable: Observable<TimeTableEntity[]>;
  timetablesnml: TimeTableEntityResponseDTO[];
  mytimetablesnml: TimeTableEntityResponseDTO[];
  classroom:ClassroomResponseDTO[];
  classrooms: ClassroomResponseDTO[]=[];
  role:any;
  days: string[];
  timetableHours: any;
  constructor(private userService: UserService, private subjectService: SubjectService, private notifyService : NotificationService,
              private  subjecteDetailservice:SubjectdetailService,private router: Router, private route: ActivatedRoute, private timeTableService: TimetableService) { }

  ngOnInit() {
    this.subject_detail_id = this.route.snapshot.params['id'];
    this.days = EnumValues.getNames(DayOfWeek);
    this.timetableHours = EnumValues.getNamesAndValues(TimeEnum);
    this.userService.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
      this.subjecteDetailservice.findById(this.subject_detail_id).subscribe(data => {
        this.subjectdetail=data;
        this.timeTableService.getTimeTableByClass(this.subjectdetail.fkClassroom.id).subscribe(data=>{
          this.timetablesnml=data;
          this.isDataAvailable=true;
        });
      });
    });
  }

  getSubjectByClassAndDayAndTimeForHeadteacher(subid, day, time): TimeTableEntityResponseDTO {
    // console.log(this.timetablesnml);
    if (this.timetablesnml != null) {
      const enrs = this.timetablesnml.filter(enrs => (enrs.subjectDetails.fkSubject.id === subid && enrs.dayOfWeek === day && enrs.time===time.name));
      // console.log(this.timetablesnml,null,4);
      if (enrs.length > 0) {
        return enrs[0];
      } else {
        return null;
      }
    }
    // return this.timeTableService.findByClassAndDayAndTime(classid,day,time);
  }

  create() {
    this.subjectService.findById(this.subject_detail_id).subscribe(data =>
      this.router.navigate(['timetable/create', data.id])
    );
  }

  userRole() {
    if(isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

  update(entity_id: number) {
    this.router.navigate(['timetable/update', entity_id]);
  }
  subjectDetails() {
    this.router.navigate(['subjectdetail/classroom' , this.subjectdetail.fkClassroom.id]);
  }

  delete(entity_id: number) {
    this.timeTableService.delete(entity_id).subscribe(() => {
      this.refresh();
       this.notifyService.showSuccess('Time table entity deleted', 'Ok');
    });
  }

  refresh(): void {
    window.location.reload();
  }
}
