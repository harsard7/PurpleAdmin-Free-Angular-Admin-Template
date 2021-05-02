import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ConfigService} from "./config.service";
import {StudentResponseDTO} from "../dto/response/studentResponseDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private apiService: ApiService, private configService: ConfigService) {

  }

  findById(id: number) {
    return this.apiService.get(this.configService.getStudentUrl + '/' + id);
  }

  findByUserId(user_id : number) {
    return this.apiService.get(this.configService.getStudentByUserIdUrl + '/' + user_id);
  }

  create(student: StudentResponseDTO) {
    return this.apiService.post(this.configService.getCreateStudentUrl, student);
  }

  update(id: number, student: StudentResponseDTO) {
    return this.apiService.put(this.configService.getUpdateStudentUrl + '/' + id, student);
  }

  delete(student_id: number) {
    return this.apiService.delete(this.configService.getDeleteStudentUrl + '/' + student_id, student_id);
  }

  summary(id : number) {
    return this.apiService.get(this.configService.getSummaryStudentUrl + '/' + id);
  }
  findAll(){
    return this.apiService.get(this.configService.getStudentAllUrl);
  }
  getAll(params): Observable<any> {
    // return this.http.get(baseUrl, { params });
    return this.apiService.getAll(this.configService.getStudentUrlPage,params);
  }

}
