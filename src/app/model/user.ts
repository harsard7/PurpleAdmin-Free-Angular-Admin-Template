import {Authorities} from "./authorities";

export class User {

    id: number;
    username: string;
    firstname: string;
    lastname: string;
  fullname:string;
  authorities:Authorities[];
    userType: string;
    active:boolean;

}
