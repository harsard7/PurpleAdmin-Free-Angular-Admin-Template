import {Gender} from "../enums/Gender";
import {User} from "../model/user";

export class SuperUser {
     id: number;
    regNo:string;
     gender:Gender;
     email:string;
  firstName:string;
    lastName:string;
  mobileNo1:string;
    mobileNo2:string;
  dateOfBirth:string;
    address1:string;
  address2:string;
    address3:string;
  address4:string;
    city:string;
  active:boolean;
  fkUser:User;
}
