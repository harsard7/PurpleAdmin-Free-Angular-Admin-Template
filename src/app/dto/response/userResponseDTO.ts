import {UserType} from "../../enums/userType";

export class UserResponseDTO {

    username: string;
    password: string;
    fullName: string;
    role: string;
     userType:UserType;
}
