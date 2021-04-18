import {SuperUser} from "../abstract/superUser";
import {SubjectDetailDTO} from "./subjectDetailsDTO";

export  class TeacherDTO extends SuperUser{
  qualification:string;
  subjectsDetails: SubjectDetailDTO[];

}
