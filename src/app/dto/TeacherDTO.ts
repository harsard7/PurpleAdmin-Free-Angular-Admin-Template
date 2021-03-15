import {SuperUser} from "../abstract/superUser";
import {Subject} from "../model/subject";

export  class TeacherDTO extends SuperUser{
  qualification:string;
  subjects: Subject[];

}
