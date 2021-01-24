import { Student } from './student';
import { Subject } from './subject';

export class Report {

    id: number;
    student: Student;
    year: number;
    semester: number;
    subject: Subject;
    mark: number;
}
