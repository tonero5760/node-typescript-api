import IUser from "./user.interface";
import IColor from "./color.interface";
import IIcon from "./icon.interface";

interface ICategory {
  _id: string;
  name: string;
  user: IUser | string;
  isEditable: boolean;
  color: IColor;
  icon: IIcon;
}

export default ICategory;
