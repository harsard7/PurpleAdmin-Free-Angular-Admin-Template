import { User } from './user';
import {UserResponseDTO} from "../dto/response/userResponseDTO";

export class Teacher {

    id: number;
  fkUser: User;
    email: string;
    phone: string;
}
