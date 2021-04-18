import {ExamType} from "../../enums/ExamType";

export class ExamResponseDTO {

    mark: number;
    written_at: string;
    examType: ExamType;
    subject_id: number;
    student_id: number;
}
