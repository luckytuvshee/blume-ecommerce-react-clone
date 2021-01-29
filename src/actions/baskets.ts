import { GET_BASKETS, BASKET_ERROR } from "./types";
import axios from "axios";

export const getBaskets = () => async (dispatch: any) => {
  try {
    const baskets = await axios.get("/api/baskets");

    dispatch({
      type: GET_BASKETS,
      payload: baskets.data,
    });
  } catch (err) {
    console.log("err");
    console.log(err);
    dispatch({
      type: BASKET_ERROR,
    });
  }
};

export const updateQuantity = (quantity: number, product_id: string) => async (
  dispatch: any
) => {
  try {
    const baskets = await axios.get("/api/baskets");

    dispatch({
      type: GET_BASKETS,
      payload: baskets.data,
    });
  } catch (err) {
    console.log("err");
    console.log(err);
    dispatch({
      type: BASKET_ERROR,
    });
  }
};
