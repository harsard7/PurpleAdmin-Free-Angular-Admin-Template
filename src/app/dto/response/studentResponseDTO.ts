import {ParentType} from "../../enums/parentType";
import {UserResponseDTO} from "./userResponseDTO";
import {ParentDTO} from "../parentDTO";
import {StudentStatus} from "../../enums/studentStatus";
import {Classroom} from "../../model/classroom";

export class StudentResponseDTO {
           id: number;
    firstName: string;
     lastName: string;
     indexNo: string;
      status: StudentStatus;
      active:boolean;
     guardianRelation: string;
     parentType:ParentType;
     fkuser:UserResponseDTO;
     parent:ParentDTO;
    dateOfBirth: string;
  dateofJoin: string;
  dateofLeave: string;
  leavingReason: string;
    gender: string;
    mobileNo: string;
  classroom: Classroom;
  JoinClass: Classroom;
  lastClass: Classroom;
}
