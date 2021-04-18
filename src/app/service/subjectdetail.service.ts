import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ConfigService} from "./config.service";
import {SubjectResponseDTO} from "../dto/response/subjectResponseDTO";
import {SubjectDetailDTO} from "../dto/subjectDetailsDTO";

@Injectable({
  providedIn: 'root'
})
export class SubjectdetailService {
  constructor(private apiService: ApiService, private configService: ConfigService) {

  }

  findAll() {
    return this.apiService.get(this.configService.allSubjecdetailUrl);
  }
  findAllByTeacherID(id: number) {
    return this.apiService.get(this.configService.allSubjecdetailUrl + '/' + id);
  }

  findById(id: number) {
    return this.apiService.get(this.configService.subjecdetailtByIdUrl + '/' + id);
  }
  findByClassId(id: number) {
    return this.apiService.get(this.configService.subdetailByClassIdUrl + '/' + id);
  }

  create(subject: SubjectDetailDTO) {
    return this.apiService.post(this.configService.createSubjecdetailtUrl, subject);
  }

  update(id: number, subject: SubjectDetailDTO) {
    return this.apiService.put(this.configService.updateSubjecdetail + '/' + id, subject);
  }

  delete(id: number) {
    return this.apiService.delete(this.configService.deleteSubjecdetailtUrl + '/' + id, id);
  }

  setSubject(student_id: number, subject_id: number) {
    return this.apiService.put(this.configService.getSetSubjectToStudentUrl + '/' + student_id, subject_id);
  }

}
