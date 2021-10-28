import ActionTypes from "./action/constants/Constant";
import { Product } from "./product";

export interface ChangeProductData {
    type: typeof ActionTypes.CHANGE_PRODUCT_STATE;
    payload: Product[];
  }

  export type ProductActionTypes =
  |ChangeProductData;

  export type ProductActions = ProductActionTypes;