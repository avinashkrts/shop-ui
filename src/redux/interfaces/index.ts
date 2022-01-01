import { IBrandActions } from "./brand.interface";
import { IProductActions } from "./product.interface";
import { IUserActions } from "./user.interface";
import { IVarientActions } from "./varient.interface";

export type AllActions =
  | IProductActions
  | IUserActions
  | IVarientActions
  | IBrandActions;

export type AppActions = AllActions;