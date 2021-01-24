import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ConfigService} from "./config.service";
import {SubjectResponseDTO} from "../dto/response/subjectResponseDTO";


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private apiService: ApiService, private configService: ConfigService) {

  }

  findAll() {
    return this.apiService.get(this.configService.getGetAllSubjectsUrl);
  }

  findById(id: number) {
    return this.apiService.get(this.configService.getGetSubjectByIdUrl + '/' + id);
  }

  getSubjectsByTeacherId(teacher_id: number) {
    return this.apiService.get(this.configService.getGetSubjectsByTeacherIdUrl + '/' + teacher_id);
  }

  create(subject: SubjectResponseDTO) {
    return this.apiService.post(this.configService.getCreateSubjectUrl, subject);
  }

  update(id: number, subject: SubjectResponseDTO) {
    return this.apiService.put(this.configService.getUpdateSubjectUrl + '/' + id, subject);
  }

  delete(id: number) {
    return this.apiService.delete(this.configService.getDeleteSubjectUrl + '/' + id, id);
  }

  setSubject(student_id: number, subject_id: number) {
    return this.apiService.put(this.configService.getSetSubjectToStudentUrl + '/' + student_id, subject_id);
  }

  unsetSubject(student_id: number, subject_id: number) {
    return this.apiService.put(this.configService.getUnsetSubjectToStudentUrl + '/' + student_id, subject_id);
  }
}
