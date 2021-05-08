import { Subject } from './subject';
import { Student } from './student';
import {ExamType} from "../enums/ExamType";
import {SubjectDetailDTO} from "../dto/subjectDetailsDTO";
import {SubjectResponseDTO} from "../dto/response/subjectResponseDTO";

export class Exam {

    id: number;
    mark: number;
  written_at: string;
    examType: ExamType;
    subject: SubjectResponseDTO;
    student: Student;
}
