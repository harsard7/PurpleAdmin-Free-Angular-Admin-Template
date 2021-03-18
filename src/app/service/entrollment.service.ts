import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ConfigService} from "./config.service";
import {SubjectDetailDTO} from "../dto/subjectDetailsDTO";
import {EntrollmentDTO} from "../dto/EntrollmentDTO";

@Injectable({
  providedIn: 'root'
})
export class EntrollmentService {

  constructor(private apiService: ApiService, private configService: ConfigService) {

  }
  findAll() {
    return this.apiService.get(this.configService.entrollmentUrlAll);
  }

  findById(id: number) {
    return this.apiService.get(this.configService.entrollmentByIdUrl + '/' + id);
  }

  create(entrollmentDTO: EntrollmentDTO) {
    return this.apiService.post(this.configService.createEntrollmentUrl, entrollmentDTO);
  }

}
