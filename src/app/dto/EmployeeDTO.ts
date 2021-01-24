
import {SuperUser} from "../abstract/superUser";
import {ProfessionType} from "../enums/professionType";


export  class EmployeeDTO extends SuperUser{

  profession:ProfessionType;
  qualification:string;


}
