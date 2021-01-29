import { GET_PRODUCTS, PRODUCT_ERROR } from "./types";
import axios from "axios";

export const getProducts = () => async (dispatch: any) => {
  try {
    const products = await axios.get("/api/products");

    dispatch({
      type: GET_PRODUCTS,
      payload: products.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};
