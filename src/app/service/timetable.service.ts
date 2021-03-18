import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ConfigService} from "./config.service";
import {TimeTableEntityResponseDTO} from "../dto/response/timeTableEntityResponseDTO";
import {DayOfWeek} from "../enums/day-of-week";
import {TimeEnum} from "../enums/time-enum";

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  constructor(private apiService: ApiService, private configService: ConfigService) {

  }

  getTimeTableByStudent(id: number) {
    return this.apiService.get(this.configService.getGetTimeTableByStudentUrl + '/' + id);
  }

  getTimeTableByTeacher(id: number) {
    return this.apiService.get(this.configService.getGetTimeTableByTeacherUrl + '/' + id);
  }

  findById(id: number) {
    return this.apiService.get(this.configService.getFindByIdTimeTableUrl + '/' + id);
  }
  findAll() {
    return this.apiService.get(this.configService.timetableAllUrl);
  }
  findByClassAndDayAndTime(id:number,day:DayOfWeek,time:TimeEnum){
    return this.apiService.get(this.configService.timetableUrl + '/' + id + '/' + day + '/' + time);
  }

  // create(timetable_id: number, timeTableEntity: TimeTableEntityResponseDTO) {
  //   return this.apiService.post(this.configService.getCreateTimeTableUrl + '/' + timetable_id, timeTableEntity);
  // }
  create( timeTableEntity: TimeTableEntityResponseDTO) {
    return this.apiService.post(this.configService.getCreateTimeTableUrl,  timeTableEntity);
  }

  update(id: number, timeTableEntity: TimeTableEntityResponseDTO) {
    return this.apiService.put(this.configService.getUpdateTimeTableUrl + '/' + id, timeTableEntity);
  }

  delete(id: number) {
    return this.apiService.delete(this.configService.getDeleteTimeTableUrl + '/' + id, id);
  }

  getTimeTableEntitiesBySubject(subject_id: number) {
    return this.apiService.get(this.configService.getGetTimeTableEntitiesBySubjectUrl + '/' + subject_id);
  }
}
