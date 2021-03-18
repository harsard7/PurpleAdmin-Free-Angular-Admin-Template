import { Student } from '../model/student';
import {StudentResponseDTO} from "./response/studentResponseDTO";

export class AttendanceDTO {

    student: StudentResponseDTO;
    isMiss: boolean;
}
