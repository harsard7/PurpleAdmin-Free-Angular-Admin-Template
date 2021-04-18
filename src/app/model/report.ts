import { Student } from './student';
import { Subject } from './subject';
import {ExamType} from "../enums/ExamType";

export class Report {

    id: number;
    student: Student;
    year: number;
  examType: ExamType;
    subject: Subject;
    mark: number;
}
