import { Subject } from './subject';
import { Student } from './student';
import {ExamType} from "../enums/ExamType";

export class Exam {

    id: number;
    mark: number;
  written_at: string;
    examType: ExamType;
    subject: Subject;
    student: Student;
}
