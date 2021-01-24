import { Subject } from './subject';
import { Student } from './student';

export class Exam {

    id: number;
    mark: number;
    writtenAt: string;
    examType: string;
    subject: Subject;
    student: Student;
}
