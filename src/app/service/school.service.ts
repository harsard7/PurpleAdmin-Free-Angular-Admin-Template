import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ConfigService} from "./config.service";
import {RoomResponseDTO} from "../dto/response/roomResponseDTO";
import {SchoolDTO} from "../dto/schoolDTO";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private apiService: ApiService, private configService: ConfigService) {

  }
  findAll() {
    return this.apiService.get(this.configService.getFindAllSesionUrl);
  }

  findactive(){
    return this.apiService.get(this.configService.activeSchoolUrl);
  }

  create(session: SchoolDTO) {
    return this.apiService.post(this.configService.getCreateSessionUrl, session);
  }

  // delete(id: number) {
  //   return this.apiService.delete(this.configService.getDeleteRoomUrl + '/' + id, id);
  // }
}
