import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ConfigService} from "./config.service";
import {StudentResponseDTO} from "../dto/response/studentResponseDTO";
import {EmployeeDTO} from "../dto/EmployeeDTO";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private apiService: ApiService, private configService: ConfigService) {

  }

  findById(id: number) {
    return this.apiService.get(this.configService.getEmployeeUrl + '/' + id);
  }

  findByUserId(user_id : number) {
    return this.apiService.get(this.configService.getEmployeeByUserIdUrl + '/' + user_id);
  }

  create(employee: EmployeeDTO) {
    return this.apiService.post(this.configService.getCreateEmployeeUrl, employee);
  }

  update(id: number, employee: EmployeeDTO) {
    return this.apiService.put(this.configService.getUpdateEmployeeUrl + '/' + id, employee);
  }

  delete(employeeid: number) {
    return this.apiService.delete(this.configService.getDeleteEmployeeUrl + '/' + employeeid, employeeid);
  }

  findAll(){
    return this.apiService.get(this.configService.getEmployeeAllUrl);
  }
  findAllPrincipals(){
    return this.apiService.get(this.configService.getFindPrincipalUrl);
  }

}
