import { Subject } from './subject';
import { Student } from './student';

export class Exam {

    id: number;
    mark: number;
  written_at: string;
    examType: string;
    subject: Subject;
    student: Student;
}
