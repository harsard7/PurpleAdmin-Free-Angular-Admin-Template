import {UserType} from "../../enums/userType";

export class UserResponseDTO {

    username: string;
  lastName: string;
  firstName: string;
    password: string;
    fullName: string;
    role: string;
     userType:UserType;
}
