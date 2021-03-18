import {ClassroomResponseDTO} from "./response/classroomResponseDTO";
import {TeacherDTO} from "./TeacherDTO";
import {SubjectResponseDTO} from "./response/subjectResponseDTO";

export class SubjectDetailDTO {
    id: number;
  active: boolean;
  fkSubject: SubjectResponseDTO;
  fkClassroom: ClassroomResponseDTO;
  fkTeacher: TeacherDTO;
}
