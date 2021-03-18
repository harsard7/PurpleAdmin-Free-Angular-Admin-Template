import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {ConfigService} from "./config.service";
import {ParentDTO} from "../dto/parentDTO";


@Injectable({
  providedIn: 'root'
})
export class ParentService {
  constructor(private apiService: ApiService, private configService: ConfigService) {

  }

  findById(id: number) {
    return this.apiService.get(this.configService.getParentUrl + '/' + id);
  }

  findByUserId(user_id : number) {
    return this.apiService.get(this.configService.getParentByUserIdUrl + '/' + user_id);
  }

  create(parent: ParentDTO) {
    return this.apiService.post(this.configService.getCreateParentUrl, parent);
  }

  update(id: number, parent: ParentDTO) {
    return this.apiService.put(this.configService.getUpdateParentUrl + '/' + id, parent);
  }

  delete(parentid: number) {
    return this.apiService.delete(this.configService.getDeleteParentUrl + '/' + parentid, parentid);
  }

  findAll(){
    return this.apiService.get(this.configService.getParentAllUrl);
  }
  findAllPrincipals(){
    return this.apiService.get(this.configService.getFindPrincipalUrl);
  }

}
