import { Student } from '../model/student';
import {StudentResponseDTO} from "./response/studentResponseDTO";

export class ExamDTO {

    student: StudentResponseDTO;
    mark: number;
    written_at: string;
    examType: string;
}
