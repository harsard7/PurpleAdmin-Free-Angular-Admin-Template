import {ParentType} from "../../enums/parentType";
import {UserResponseDTO} from "./userResponseDTO";
import {ParentDTO} from "../parentDTO";
import {StudentStatus} from "../../enums/studentStatus";

export class StudentResponseDTO {

    firstName: string;
     lastName: string;
     indexNo: string;
      status: StudentStatus;
      active:boolean;
     guardianRelation: string;
     parentType:ParentType;
     fkuser:UserResponseDTO;
     parent:ParentDTO;
    username: string;
    dateOfBirth: string;
    start_year: number;
    // address: string;
    gender: string;
    educationId: string;
    healthCareId: string;
    parent1Name: string;
    parent2Name: string;
    parent1Phone: string;
    parent2Phone: string;
    classroom_id: number;
}
