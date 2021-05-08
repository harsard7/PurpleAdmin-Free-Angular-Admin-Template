import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ConfigService} from "./config.service";
import {ReportResponseDTO} from "../dto/response/reportResponseDTO";
import {ExamType} from "../enums/ExamType";
import {Exam} from "../model/exam";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private apiService: ApiService, private configService: ConfigService) {

  }

  getResultByStudent(student_id: number, exam: Exam) {
    return this.apiService.post(this.configService.getGetResultByStudentUrl + '/' + student_id , exam);
  }
  getAvgBySubject( exam: Exam) {
    return this.apiService.post(this.configService.getGetavgforSubject  , exam);
  }

  findById(id: number) {
    return this.apiService.get(this.configService.getFindReportByIdUrl + '/' + id);
  }

  create(report: ReportResponseDTO) {
    return this.apiService.post(this.configService.getCreateReportUrl, report);
  }
  createTermReport(term: any) {
    return this.apiService.post(this.configService.getFindTermReportByIdUrl, term);
  }

  update(id: number, report: ReportResponseDTO) {
    return this.apiService.put(this.configService.getUpdateReportUrl + '/' + id, report);
  }

  delete(id: number) {
    return this.apiService.delete(this.configService.getDeleteReportUrl + '/' + id, id);
  }

  makeReportFormToClassroom(classroom_id: number) {
    return this.apiService.get(this.configService.getMakeReportFormToClassroomUrl + '/' + classroom_id);
  }

  createReportsToClassroom(reports: ReportResponseDTO[]) {
    return this.apiService.post(this.configService.getCreateReportsToClassroomUrl, reports);
  }
}
