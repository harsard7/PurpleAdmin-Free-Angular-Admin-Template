import { Student } from '../model/student';
import { ReportResponseDTO } from './response/reportResponseDTO';
import {StudentResponseDTO} from "./response/studentResponseDTO";

export class ReportDTO {

    student: StudentResponseDTO;
    reportResponseDTO: ReportResponseDTO;
}
