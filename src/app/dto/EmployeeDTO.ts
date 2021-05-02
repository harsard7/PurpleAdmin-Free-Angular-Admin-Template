
import {SuperUser} from "../abstract/superUser";
import {ProfessionType} from "../enums/professionType";
import {FileInfo} from "./FileInfo";


export  class EmployeeDTO extends SuperUser{

  profession:ProfessionType;
  qualification:string;
  image:FileInfo;


}
