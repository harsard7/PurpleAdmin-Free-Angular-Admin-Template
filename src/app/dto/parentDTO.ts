import {SuperUser} from "../abstract/superUser";

export  class ParentDTO extends SuperUser{
  comment: string;
  profession: string;
  childrens: [];

}
