
import {SuperUser} from "../abstract/superUser";
import {ProfessionType} from "../enums/professionType";
import {StudentResponseDTO} from "./response/studentResponseDTO";
import {SubjectDetailDTO} from "./subjectDetailsDTO";


export  class EntrollmentDTO {

  student:StudentResponseDTO;
  subjectDetails:SubjectDetailDTO;


}
