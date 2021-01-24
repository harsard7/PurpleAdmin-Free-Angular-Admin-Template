import { Student } from '../model/student';
import { Subject } from '../model/subject';

export class FailedStudentDTO {

    student: Student;
    subjects: Subject[];
}
