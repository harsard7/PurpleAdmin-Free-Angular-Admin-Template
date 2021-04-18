import {UserType} from "../../enums/userType";

export class UserResponseDTO {

    id: number;
    username: string;
  lastName: string;
  firstName: string;
    password: string;
  fullName: string;
    role: string;
     userType:UserType;
}
