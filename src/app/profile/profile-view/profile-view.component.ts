import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../service/notification.service";
import {EmployeeService} from "../../service/employee.service";
import {SchoolService} from "../../service/school.service";
import {UserService} from "../../service/user.service";
import {EmployeeDTO} from "../../dto/EmployeeDTO";
import {StudentService} from "../../service/student.service";
import {TeacherService} from "../../service/teacher.service";
import {StudentResponseDTO} from "../../dto/response/studentResponseDTO";
import {TeacherDTO} from "../../dto/TeacherDTO";
import {SubjectdetailService} from "../../service/subjectdetail.service";
import {SubjectDetailDTO} from "../../dto/subjectDetailsDTO";
import {EnumValues} from "enum-values";
import {DayOfWeek} from "../../enums/day-of-week";
import {TimeEnum} from "../../enums/time-enum";
import {TimeTableEntityResponseDTO} from "../../dto/response/timeTableEntityResponseDTO";
import {ClassroomService} from "../../service/classroom.service";
import {Observable} from "rxjs";
import {ClassroomResponseDTO} from "../../dto/response/classroomResponseDTO";
import {TimetableService} from "../../service/timetable.service";

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  currentUser: any = {};
  employeerender:boolean;
  teacherrender:boolean;
  headteacherrender:boolean;
  studentrender:boolean;
  employee:EmployeeDTO;
  student:StudentResponseDTO;
  teacher:TeacherDTO;
  subjectDetails:SubjectDetailDTO[];
  timetablesnml: TimeTableEntityResponseDTO[];
  mytimetablesnml: TimeTableEntityResponseDTO[];
  classroom:ClassroomResponseDTO[];
  classrooms: ClassroomResponseDTO[]=[];
  role:any;
  days: string[];
  timetableHours: any;
  constructor(private notifyService : NotificationService, private employeeservice: EmployeeService, private  sessionService :SchoolService, private userservice:UserService,
              private studentservice: StudentService,private teacherservice:TeacherService,private subjectDetailservice:SubjectdetailService,private classroomService: ClassroomService,private timeTableService: TimetableService) { }

  ngOnInit() {
      this.userservice.getMyInfo().toPromise().then(data =>  {
      this.currentUser = data;
        console.log(this.currentUser);
      this.role=this.currentUser.authorities[0].authority;
        this.days = EnumValues.getNames(DayOfWeek);
        this.timetableHours = EnumValues.getNamesAndValues(TimeEnum);

      this.employeeservice.findByUserId(this.currentUser.id).subscribe(data=>{// CHECK IF USER IS EMPLOYEE/ADMIN/PRINCIPAL
        console.log(data);
        if(data){
          console.log("employee");
          this.employee=data;
          this.employeerender=true;
        }else{
           this.studentservice.findByUserId(this.currentUser.id).subscribe(data=>{// CHECK IF USER IS STUDENT
            if(data){
              console.log("STUDENT");
              this.student=data;
              this.studentrender=true;
              this.loadTimeTableForStudentAndHeadTeacher(data,this.student.classroom.id);
            }else{
              this.teacherservice.findByUserId(this.currentUser.id).subscribe(data=>{// CHECK IF USER IS TEACHER
                 if(data){
                   console.log("TEACHER");
                   this.teacherrender=true;
                  this.teacher=data;
                   this.subjectDetailservice.findAllByTeacherID(this.teacher.id).subscribe(data=>{ // GET TEACHER SUBJECTS
                     this.subjectDetails=data;
                   });
                   // GET CLASS TIME TABLE FOR HEAD TEACHER
                  this.classroomService.findByHeadteacherId(this.teacher.id).subscribe(data=>{
                    if(data){
                      console.log("HEAD_TEACHER");
                      this.headteacherrender=true;
                     this.loadTimeTableForStudentAndHeadTeacher(data,data.id);
                    }
                    // GET SUBJECT TIME TABLE FOR TEACHER/HEAD TEACHER
                    this.timeTableService.getTimeTableByTeacher(this.teacher.id).subscribe(data=>{
                      this.mytimetablesnml=data;
                    });
                  });
                }else{
                  this.notifyService.showWarning(null,'Profile Details Not Found');
                }
              });
            }
          });
        }
      });
    });
  }

  loadTimeTableForStudentAndHeadTeacher(data: any,id:number){
    this.classrooms.push(data);
    this.timeTableService.getTimeTableByClass(data.id).subscribe(data => {// GET TIME TABLE BY CLASS
      this.timetablesnml = data;
    });
  }
  getSubjectByClassAndDayAndTimeForHeadteacher(classid, day, time): TimeTableEntityResponseDTO {
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
  getSubjectByClassAndDayAndTime(techrid, day, time): TimeTableEntityResponseDTO {
    // console.log(this.timetablesnml);
    if (this.mytimetablesnml != null) {
      const enrs = this.mytimetablesnml.filter(enrs => (enrs.subjectDetails.fkTeacher.id === techrid && enrs.dayOfWeek === day && enrs.time===time.name));
      if (enrs.length > 0) {
        return enrs[0];
      } else {
        return null;
      }
    }
    // return this.timeTableService.findByClassAndDayAndTime(classid,day,time);
  }

}
