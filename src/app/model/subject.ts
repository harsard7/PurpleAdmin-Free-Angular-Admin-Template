import { Teacher } from './teacher';

export class Subject {

    id: number;
    title: string;
    year: number;
  fkTeacher: Teacher;
}
