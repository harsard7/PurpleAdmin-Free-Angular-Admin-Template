import {Teacher} from "../../model/teacher";

export class ClassroomResponseDTO {

    id: number;
    start_year: number;
    headTeacher: Teacher;
    end_year: number;
    year: number;
    letter: string;
    headTeacher_id: number;
}
