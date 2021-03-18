import {DayOfWeek} from "../../enums/day-of-week";
import {TimeEnum} from "../../enums/time-enum";
import {ClassroomResponseDTO} from "./classroomResponseDTO";
import {SubjectDetailDTO} from "../subjectDetailsDTO";

export class TimeTableEntityResponseDTO {

  id:number;
  dayOfWeek: DayOfWeek;
  time: TimeEnum;
  classroom: ClassroomResponseDTO;
  subjectDetails: SubjectDetailDTO;
  // classroom_id: number;
  // subject_id: number;
  // room_id: any;
  // day: number;
  // lessonNumber: number;

}
