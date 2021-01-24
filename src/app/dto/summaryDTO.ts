import { Exam } from '../model/exam';

export class SummaryDTO {

    subjectName: string;
    exams: Exam[];
    average: number;
}
