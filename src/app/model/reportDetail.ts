import { Subject } from './subject';
import { Student } from './student';
import {ExamType} from "../enums/ExamType";
import {SubjectDetailDTO} from "../dto/subjectDetailsDTO";
import {SubjectResponseDTO} from "../dto/response/subjectResponseDTO";

export class ReportDetail {

    id: number;
    mark: number;
  minmark: number;
  maxmark: number;
  rank: number;
  totalMarks: number;
  totalavg: number;
  totalSubjects: number;
  classrank: number;
  totalMinimum: number;
  totalMaximum: number;
  written_at: string;
    examType: ExamType;
    subject: SubjectResponseDTO;
    student: Student;
}
