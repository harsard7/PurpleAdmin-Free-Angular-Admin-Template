import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeTableEntityResponseDTO } from 'src/app/dto/response/timeTableEntityResponseDTO';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassroomService } from 'src/app/service/classroom.service';
import { TimetableService} from "../../service/timetable.service";

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
import {ExamResponseDTO} from "../../dto/response/examResponseDTO";
import {TeacherService} from "../../service/teacher.service";
import {TeacherDTO} from "../../dto/TeacherDTO";


@Component({
  selector: 'app-timetable-entity-create',
  templateUrl: './timetable-entity-create.component.html',
  styleUrls: ['./timetable-entity-create.component.scss']
})
export class TimetableEntityCreateComponent implements OnInit {

  id: number;
  currentUser: any = {};
  isDataAvailable: boolean = false;
  selectedOptionClassroom: ClassroomResponseDTO;
  selectedsubjectDetail: any;
  selectedOptionTime: any;
  selectedOptionDay: any;

  classrooms: Observable<ClassroomResponseDTO[]>;
  timetables: Observable<TimeTableEntityResponseDTO[]>;
  timetablesnml: TimeTableEntityResponseDTO[];
  rooms: Observable<Room[]>;
  teachers: TeacherDTO[];
  timeTableEntity = new TimeTableEntityResponseDTO();
  days: string[];
  timetableHours: any;
  subjectsDetails: Observable<SubjectDetailDTO[]>;
  searchText: any;

  // table
  config: any;
  collection = {count: 0, data: []};
  public maxSize: number = 5;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '<',
    nextLabel: '>',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  teachersubject = {name: '', count: 0};
  teachersubjectList:[]=[];
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private roomService: RoomService,private teacherservice:TeacherService,
              private classroomService: ClassroomService, private timeTableService: TimetableService, private notifyService: NotificationService, private  subjecteDetailservice: SubjectdetailService) {
  }

  ngOnInit() {
    // this.id = this.route.snapshot.params['id'];
    this.userService.getMyInfo().toPromise().then(data => {
      this.currentUser = data;
      this.classroomService.findAll().subscribe(data => {
        this.classrooms = data;
        this.roomService.findAll().subscribe(data => {
          this.rooms = data;
          this.isDataAvailable = true;
          this.timeTableService.findAll().subscribe(data => {
            console.log(data);
            this.collection.data = this.timetables = data;
            this.timetablesnml = data;
            this.days = EnumValues.getNames(DayOfWeek);
            // this.timetableHours = EnumValues.getNames(TimeEnum);
            this.timetableHours = EnumValues.getNamesAndValues(TimeEnum);
            this.teacherservice.findAll().subscribe(data=>this.teachers=data);
            this.loadData();
          });
        });
      });
    });
  }

  loadData() {
    console.log('sdf');
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
    console.log(this.collection.count);
    console.log(this.config.totalItems);
  }

  onPageChange(event) {
    // console.log(event);
    this.config.currentPage = event;
  }

  loadTimeTable() {
    this.timeTableService.findAll().subscribe(data => {
      this.collection.data = this.timetables = data;
      this.timetablesnml = data;
      this.loadData();
    })
  }


  reset() {
    this.timeTableEntity = new TimeTableEntityResponseDTO();
    this.isDataAvailable = false;
    this.selectedOptionClassroom = undefined;
    this.selectedsubjectDetail = undefined;
    this.selectedOptionDay = undefined;
    this.selectedOptionTime = undefined;
  }

  onSubmit() {
    if (this.validate()) {
      this.timeTableEntity.classroom = this.selectedOptionClassroom;
      this.timeTableEntity.subjectDetails = this.selectedsubjectDetail;
      this.timeTableEntity.dayOfWeek = this.selectedOptionDay;
      this.timeTableEntity.time = this.selectedOptionTime.name;
      this.timeTableService.create(this.timeTableEntity).subscribe(() => {
        this.loadTimeTable();
        // this.loadData();
        this.notifyService.showSuccess('Time table entity created.', 'Ok');
        this.reset();
      }, error => {
        this.notifyService.showError(error)
      });
    }
  }

  validate() {
    var valid = true;
    if (!this.selectedOptionClassroom) {
      valid = false;
      this.notifyService.showWarning(null, 'Please select the Classroom')
    }
    if (!this.selectedsubjectDetail) {
      valid = false;
      this.notifyService.showWarning(null, 'Please select the Subject')
    }
    if (!this.selectedOptionDay) {
      valid = false;
      this.notifyService.showWarning(null, 'Please select the Day')
    }
    if (!this.selectedOptionTime) {
      valid = false;
      this.notifyService.showWarning(null, 'Please select the Time Slot')
    }
    return valid;
  }

  goBack() {
    this.router.navigate(['timetable/view']);
  }

  enumValue(value: string) {
    return TimeEnum[value];

  }

  userRole() {
    if (isAdmin(this.currentUser, this.router)) {
      return true;
    } else {
      this.router.navigate(['403']);
    }
  }

  loadSubdetails(selectedclassid: any) {
    console.log(selectedclassid);
    this.subjecteDetailservice.findByClassId(selectedclassid.id).subscribe(data => {
      this.subjectsDetails = data;
    });
  }

  getSubjectByClassAndDayAndTime(classid, day, time): TimeTableEntityResponseDTO {
    // console.log(this.timetablesnml);
    if (this.timetablesnml != null) {
      const enrs = this.timetablesnml.filter(enrs => (enrs.classroom.id === classid && enrs.dayOfWeek === day && enrs.time === time.name));
      if (enrs.length > 0) {
        return enrs[0];
      } else {
        return null;
      }
    }
    // return this.timeTableService.findByClassAndDayAndTime(classid,day,time);
  }

  getteachersubjectcount(teachid): number {
  const count = this.timetablesnml.filter(enrs => enrs.subjectDetails.fkTeacher.id === teachid).length;
    return  count;

    // return this.timeTableService.findByClassAndDayAndTime(classid,day,time);
  }
}
