import { AttendanceDTO } from '../AttendanceDTO';

export class AttendanceResponseDTO {

    student_id: number;
    miss: boolean;
    lesson: number;
    dateOfMiss: string;
}