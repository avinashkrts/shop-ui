import { ProductActions } from "../action/constants";
import { Product } from "../modules/product";

export interface ChangeProductData {
  type: typeof ProductActions.GET_BY_SHOP_ID;
  payload: Product[];
}

export type ProductActionTypes =
  | ChangeProductData;

export type IProductActions = ProductActionTypes;