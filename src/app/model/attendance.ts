import { Student } from './student';
import {StudentResponseDTO} from "../dto/response/studentResponseDTO";

export class Attendance {

    id: number;
    lecture: number;
    dateOfMiss: string;
    student: StudentResponseDTO;
  isVerified: boolean;
}
