import { Subject } from './subject';
import { Classroom } from './classroom';
import { Room } from './room';

export class TimeTableEntity {

    id: number;
    day: number;
    lessonNumber: number;
    subject: Subject;
    room: Room;
    classroom: Classroom;
}
