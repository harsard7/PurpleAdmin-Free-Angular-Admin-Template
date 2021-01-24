import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ConfigService} from "./config.service";
import {ClassroomResponseDTO} from "../dto/response/classroomResponseDTO";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  constructor(private apiService: ApiService, private configService: ConfigService) {

  }

  findAll() {
    return this.apiService.get(this.configService.getAllClassroomUrl);
  }

  findById(id: number) {
    return this.apiService.get(this.configService.getGetClassroomByIdUrl + '/' + id);
  }

  findByHeadteacherId(teacher_id: number) {
    return this.apiService.get(this.configService.getFindByHeadteacherIdUrl + '/' + teacher_id);
  }

  create(classroom: ClassroomResponseDTO) {
    return this.apiService.post(this.configService.getCreateClassroomUrl, classroom);
  }

  update(id: number, classroom: ClassroomResponseDTO) {
    return this.apiService.put(this.configService.getUpdateClassroomUrl + '/' + id, classroom);
  }

  delete(classroom_id: number) {
    return this.apiService.delete(this.configService.getDeleteClassroomUrl + '/' + classroom_id, classroom_id);
  }

  getStudentsFromClassroom(id: number) {
    return this.apiService.get(this.configService.getGetStudentsFromClassroomUrl + '/' + id);
  }

  setSubject(classroom_id: number, subject_id: number) {
    return this.apiService.put(this.configService.getSetSubjectUrl + '/' + classroom_id, subject_id);
  }

  unsetSubject(classroom_id: number, subject_id: number) {
    return this.apiService.put(this.configService.getUnsetSubjectUrl + '/' + classroom_id, subject_id);
  }
}
