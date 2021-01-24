import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class HeadteacherService {
  constructor(private apiService: ApiService, private configService: ConfigService) {

  }

  findFailedStudentsInClass(classroom_id: number) {
    return this.apiService.get(this.configService.getFindFailedStudentsInClassUrl + '/' + classroom_id);
  }

  showResultBySubject(classroom_id: number) {
    return this.apiService.get(this.configService.getShowResultBySubjectUrl + '/' + classroom_id);
  }
}
